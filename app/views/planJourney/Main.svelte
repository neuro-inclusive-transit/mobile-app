<script type="ts">
  import { navigate, showModal } from "svelte-native";
  import { EventData, } from "@nativescript/core";
  import { confirm } from '@nativescript/core/ui/dialogs'

  import Route from "~/shared/components/Route.svelte";
  import Button from "~/shared/components/Button.svelte";
  import SelectionProcess from "./SelectionProcess.svelte";

  import { calcDurationBetween, printTime, printDate } from "~/shared/utils/time"

  import { Journey, journeys, liveJourney, tabIndex } from "~/stores";

  function addJourney() {
    showModal({ page: SelectionProcess as any })
  }

  let journeysByDate: Record<string, Journey[]> = {};

  $: {
    let sortedJourney = $journeys.sort((a, b) => {
      return new Date(a.sections[0].departure.time).getTime() - new Date(b.sections[0].departure.time).getTime()
    })

    sortedJourney.filter((journey) => {
      return new Date(journey.sections[journey.sections.length - 1].arrival.time).getTime() > new Date().getTime()
    }).forEach((journey) => {
      let date = new Date(journey.sections[0].departure.time)
      let dateString = printDate(date);

      console.log(dateString, journey.sections[0].departure.time)

      if (!journeysByDate[dateString]) {
        journeysByDate[dateString] = []
      }
      journeysByDate[dateString].push(journey)
    });
  }

  function onRouteSelectFactory(journey: Journey) {
    return () => {

      // TODO: check if current journey is selected journey

      function updateLiveView() {
        $liveJourney = {
          ...journey,
          isPaused: false,
          currentSection: 0,
          currentAction: 0,
        };
        $tabIndex = 1;
      }

      // check if liveJourney has current Route
      if ($liveJourney !== null) {
        confirm({
          title: "Bereits eine Reise aktiv",
          message: "Möchtest du die aktuelle Reise abbrechen?",
          okButtonText: "Neue Reise starten",
          cancelButtonText: "Bestehende Reise fortsetzen"
        }).then((result) => {
          if (result) {
            updateLiveView()
          }
        });
      } else {
        updateLiveView()
      }
    }
  }

</script>

<page class="bg-default">
  <actionBar title="Meine Reisen" />

  <gridLayout rows="auto, *" columns="*">
    <stackLayout row={0} class="main-layout">
      <Button content="Neue Reise planen" icon="add" iconPosition="post" on:tap={addJourney} />
    </stackLayout>
    <scrollView row={1}>
      <stackLayout  class="main-layout">
        {#each Object.entries(journeysByDate) as [date, journeys]}
          <label class="m-t-m fs-l fw-bold" text="{date}"></label>



          {#each journeys as journey}
          <Route
            on:tap={onRouteSelectFactory(journey)}
            class="m-t-s m-b-s"
            route={journey.sections.map((section) => ({
              type: section.transport.mode,
              begin: new Date(section.departure.time),
              end: new Date(section.arrival.time),
              transport_name: section.transport.name
            }))}>

            <stackLayout slot="maininfo">
              <stackLayout orientation="horizontal">
                <label class="fw-bold" text="{journey.departure.name}"/>
                <label class="icon" text="arrow_right" horizontalAlignment="center"/>
                <label class="fw-bold" text="{journey.arrival.name}"/>
              </stackLayout>
              <label text="Aufbruch: {new Date(journey.sections[0].departure.time).getHours().toString().padStart(2, '0')}:{new Date(journey.sections[0].departure.time).getMinutes().toString().padStart(2, '0')} Uhr" />
              <label text="Erinnerung: {journey.reminderBefore} Min. vorher" />
              <label text="Dauer: {printTime(calcDurationBetween(new Date(journey.sections[0].departure.time, ),new Date(
                journey.sections[journey.sections.length - 1].arrival.time
              )))}" />
            </stackLayout>

          </Route>
          {/each}
        {:else}
          <label>Keine geplanten Routen für die Zukunft.</label>
        {/each}
      </stackLayout>
    </scrollView>
  </gridLayout>
</page>

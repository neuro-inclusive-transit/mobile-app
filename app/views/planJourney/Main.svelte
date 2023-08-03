<script type="ts">
  import { showModal } from "svelte-native";
  import { EventData, } from "@nativescript/core";

  import Route from "~/shared/components/Route.svelte";
  import SelectionProcess from "./SelectionProcess.svelte";

  import { calcDurationBetween, printTime, printDate } from "~/shared/utils/time"

  import { Journey, journeys } from "~/stores";

  function addJourney(args: EventData) {
    showModal({ page: SelectionProcess as any })
  }

  let journeysByDate: Record<string, Journey[]> = {};

  $: {
    let sortedJourney = $journeys.sort((a, b) => {
      return new Date(a.sections[0].departure.time).getTime() - new Date(b.sections[0].departure.time).getTime()
    })

    sortedJourney.forEach((journey) => {
      let date = new Date(journey.sections[0].departure.time)
      let dateString = printDate(date);

      console.log(dateString, journey.sections[0].departure.time)

      if (!journeysByDate[dateString]) {
        journeysByDate[dateString] = []
      }
      journeysByDate[dateString].push(journey)
    });
  }

</script>

<page class="bg-default">
  <actionBar title="Meine Reisen" />

  <stackLayout class="main-layout">
    <button text="Reise hinzufügen" on:tap={addJourney} />
    {#each Object.entries(journeysByDate) as [date, journeys]}

      <label class="m-t-m fs-l fw-bold" text="{date}"></label>

      {#each journeys as journey}
        <Route
          class="m-t-s m-b-s"
          route={journey.sections.map((section) => ({
            type: section.transport.mode,
            begin: new Date(section.departure.time),
            end: new Date(section.arrival.time),
            transport_name: section.transport.name
          }))}>

          <stackLayout col={0} row={0} slot="maininfo">
            <stackLayout orientation="horizontal">
              <label class="fw-bold" text="{journey.departure.name}"/>
              <label class="icon" text="arrow_right" horizontalAlignment="center"/>
              <label class="fw-bold" text="{journey.arrival.name}"/>
            </stackLayout>
            <label text="{journey.sections[0].departure.time}" />
            <label text="Aufbruch: {new Date(journey.sections[0].departure.time).getHours()}:{new Date(journey.sections[0].departure.time).getMinutes()} Uhr" />
            <label text="Erinnerung: {journey.reminderBefore} Min. vorher" />
            <label text="Dauer: {printTime(calcDurationBetween(new Date(journey.sections[0].departure.time, ),new Date(
              journey.sections[journey.sections.length - 1].arrival.time
            )))}" />
          </stackLayout>

        </Route>
      {/each}
    {/each}
  </stackLayout>
</page>

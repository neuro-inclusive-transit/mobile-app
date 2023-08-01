<script type="ts">
  import { navigate } from "svelte-native";
  import { Frame, EventData, getRootLayout } from "@nativescript/core";

  import Route, {getDate, getDuration} from "~/shared/components/Route.svelte";

  import { journeys } from "~/stores";
  import Accordion from "~/shared/components/Accordion.svelte";

  function addJourney(args: EventData) {
    getRootLayout().notify({
      eventName: "showBottomSheet",
      object: args.object,
      eventData: {},
    });
  }
</script>

<page class="bg-default">
  <actionBar title="Meine Reisen" />

  <stackLayout class="main-layout">
    <button text="Reise hinzufügen" on:tap={addJourney} />
    {#each $journeys as journey}
      <Route
        departureTime={new Date(journey.sections[0].departure.time)}
        arrivalTime={new Date(
          journey.sections[journey.sections.length - 1].arrival.time
        )}
        route={journey.sections.map((section) => ({
          type: section.type,
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
          <label text="{getDate(new Date(journey.sections[0].departure.time))}, {new Date(journey.sections[0].departure.time).getHours()}:{new Date(journey.sections[0].departure.time).getMinutes()} Uhr" />

          <label text="<duration>" />
        </stackLayout>

      </Route>
    {/each}
  </stackLayout>
</page>

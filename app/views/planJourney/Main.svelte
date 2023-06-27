<script type="ts">
  import { navigate } from "svelte-native";
  import { Frame, EventData, getRootLayout } from "@nativescript/core";

  import Route from "~/shared/components/Route.svelte";

  import { journeys } from "~/stores";

  function addJourney(args: EventData) {
    getRootLayout().notify({
      eventName: "showBottomSheet",
      object: args.object,
      eventData: {}
    })
  }

</script>

<page class="bg-default">
  <actionBar title="Meine Reisen" />

  <stackLayout class="main-layout">
    {#each $journeys as journey}
      <Route
        departureTime={new Date(journey.sections[0].departure.time)}
        arrivalTime={new Date(journey.sections[journey.sections.length - 1].arrival.time)}
        route={journey.sections.map((section) => ({
          type: section.type,
          begin: new Date(section.departure.time),
          end: new Date(section.arrival.time),
          transport_name: section.transport.name,
        }))}/>
    {/each}

    <button text="Reise hinzufügen" on:tap="{addJourney}" />

  </stackLayout>

</page>

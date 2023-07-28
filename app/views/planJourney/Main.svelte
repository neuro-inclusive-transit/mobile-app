<script type="ts">
  import { navigate } from "svelte-native";
  import { Frame, EventData, getRootLayout } from "@nativescript/core";

  import ListRoute from "~/shared/components/ListRoute.svelte";

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
      <ListRoute
        departureTime={new Date(journey.sections[0].departure.time)}
        arrivalTime={new Date(
          journey.sections[journey.sections.length - 1].arrival.time
        )}
        route={journey.sections.map((section) => ({
          type: section.type,
          begin: new Date(section.departure.time),
          end: new Date(section.arrival.time),
          transport_name: section.transport.name
        }))}
        departure={journey.departure.name}
        arrival={journey.arrival.name}
      />
    {/each}
  </stackLayout>
</page>

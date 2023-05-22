<script type="ts">
  import { navigate } from "svelte-native";
  import { Frame, EventData, getRootLayout } from "@nativescript/core";

  import { journeys } from "~/stores";

  function addJourney(args: EventData) {
    getRootLayout().notify({
      eventName: "showBottomSheet",
      object: args.object,
      eventData: {}
    })
  }

</script>

<page>
  <actionBar title="Meine Reisen" />

  <stackLayout>
    {#each $journeys as journey}
      <stackLayout>
        <label text="{journey.departure.place.name} -> {journey.arrival.place.name} @ {journey.departure.time}" />
      </stackLayout>
    {/each}
    <label text="BACKEND_SERVICE_ROUTE_URL {process.env.BACKEND_SERVICE_ROUTE_URL}" />
    <button text="Reise hinzufügen" on:tap="{addJourney}" />
  </stackLayout>

</page>

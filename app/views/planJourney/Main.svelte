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

<page>
  <actionBar title="Meine Reisen" />

  <stackLayout>
    {#each $journeys as journey}
      <stackLayout>
        <label text="{journey.departure.place?.name} -> {journey.arrival.place?.name} @ {journey.departure.time}" />
      </stackLayout>
    {/each}
    <label text="BACKEND_SERVICE_ROUTE_URL {process.env.BACKEND_SERVICE_ROUTE_URL}" />
    <button text="Reise hinzufügen" on:tap="{addJourney}" />

    <Route
      departureTime={new Date(Date.now()+40*60000)}
      arrivalTime={new Date(Date.now()+83*60000)}
      crowdPercentage={0.1}
      route={[
        {type: 'walk', begin: new Date(Date.now()+40*60000), end: new Date(Date.now()+43*60000)},
        {type: 'bus', begin: new Date(Date.now()+43*60000), end: new Date(Date.now()+50*60000), transport_name: '335'},
        {type: 'walk', begin: new Date(Date.now()+50*60000), end: new Date(Date.now()+53*60000)},
        {type: 'train', begin: new Date(Date.now()+53*60000), end: new Date(Date.now()+83*60000), transport_name: 'RB25'}
      ]}/>


  </stackLayout>

</page>

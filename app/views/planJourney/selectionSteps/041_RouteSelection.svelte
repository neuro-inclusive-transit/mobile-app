<script>
  import { navigate, goBack } from "svelte-native";
  import NotificationFrequency from "./050_NotificationFrequency.svelte";
  import { getRootLayout } from "@nativescript/core";
  import { localize as L } from '@nativescript/localize'

  import { planJourney } from "~/stores"
  import { CompanionMode } from "~/types"

  import { routeApi } from "~/api"

  function select(mode) {
    $planJourney.companion_mode = mode;
  }

  $: routes = routeApi.get({
    origin: {
      lat: $planJourney.departure.location.lat,
      lng: $planJourney.departure.location.lng,
    },
    destination: {
      lat: $planJourney.arrival.location.lat,
      lng: $planJourney.arrival.location.lng,
    },
    departureTime: $planJourney.time.value, // TODO: switch departureTime / arrivalTime depending on the direction
  })

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function onNavigateNext() {
    navigate({
      page: NotificationFrequency,
      frame: 'planJourneySelection',
    });
  }
  function closeBottomSheet(args) {
    getRootLayout().notify({
      eventName: "hideBottomSheet",
      object: args.object,
      eventData: {}
    })
  }
</script>

<page actionBarHidden=true>
  <stackLayout>
    <button text="Close" on:tap="{closeBottomSheet}" />
    <label text="{$planJourney.departure?.icon} {$planJourney.departure?.name} -> {$planJourney.arrival?.icon} {$planJourney.arrival?.name} @ {$planJourney.time.value}" textWrap="true" />
    <label text="Routenauswahl " />

    {#await routes}
      <label>...waiting</label>
    {:then routes}
      <label text="{JSON.stringify(routes)}" textWrap="true" />
    {:catch error}
      <label style="color: red">{error}</label>
    {/await}




    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>
</page>

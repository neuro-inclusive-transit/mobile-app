<script>
  import { navigate, goBack } from "svelte-native";
  import { Template } from 'svelte-native/components'
  import NotificationFrequency from "./050_NotificationFrequency.svelte";
  import { getRootLayout } from "@nativescript/core";
  import { localize as L } from '@nativescript/localize'

  import { planJourney } from "~/stores"
  import { CompanionMode } from "~/types"

  import { routeApi } from "~/api"

  function select(route) {
    //$planJourney.companion_mode = mode;
  }

  let numOfalternatives = 3;

  $: $planJourney.options = routeApi.get({
    origin: {
      lat: $planJourney.departure.location.lat,
      lng: $planJourney.departure.location.lng,
    },
    destination: {
      lat: $planJourney.arrival.location.lat,
      lng: $planJourney.arrival.location.lng,
    },
    departureTime: $planJourney.time.value, // TODO: switch departureTime / arrivalTime depending on the direction
    alternatives: numOfalternatives,
  });



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

    {#await $planJourney.options}
      <label>...waiting</label>
    {:then routes}
      <listView height="450" items="{routes}">
        <Template let:item={route}>
          <stackLayout on:tap="{select(route)}">
            <label text="{route.sections[0].departure.time} -> {route.sections[route.sections.length - 1].arrival.time}" />
            <label text="{route.sections.map((section) => {
              return section.transport.mode + ' '
                + section.transport.name ?? '' + ' '
                + section.transport.shortName ?? '' + ' '
                + section.transport.headsign ?? '';
            }).join(' -> ')}" textWrap="true" />
            })}" textWrap="true" />
          </stackLayout>
        </Template>
      </listView>
    {:catch error}
      <label style="color: red">{error}</label>
    {/await}

    <button text="More Routes" on:tap="{() => numOfalternatives += 3}" />

    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>
</page>

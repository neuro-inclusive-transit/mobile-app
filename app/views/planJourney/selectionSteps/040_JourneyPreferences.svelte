<script>
  import { navigate, goBack } from "svelte-native";
  import RouteSelection from "./041_RouteSelection.svelte";
  import { getRootLayout } from "@nativescript/core";
  import { localize as L } from '@nativescript/localize'

  import { planJourney } from "~/stores"
  import { PreferredJourneyMode } from "~/types"

  function select(mode) {
    $planJourney.preferredJourneyMode = mode;
  }

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function onNavigateNext() {
    navigate({
      page: RouteSelection,
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
    <label text="{$planJourney.departure?.icon} {$planJourney.departure?.name} -> {$planJourney.arrival?.icon} {$planJourney.arrival?.name}" textWrap="true" />
    <label text="Bei der Reise ist mir besonders wichtig? " />
    {#each Object.keys(PreferredJourneyMode) as mode} }
      <stackLayout>
        <button text="{L('preffered_journey_mode.' + PreferredJourneyMode[mode])}" on:tap={() => select(PreferredJourneyMode[mode])}  />
      </stackLayout>
    {/each}

    <label text="{L('preffered_journey_mode._')}: { $planJourney.preferredJourneyMode }" />

    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>
</page>

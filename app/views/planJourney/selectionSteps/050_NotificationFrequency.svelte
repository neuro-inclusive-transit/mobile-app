<script>
  import { navigate, goBack } from "svelte-native";
  import ReminderSelection from "./060_ReminderSelection.svelte";
  import { getRootLayout } from "@nativescript/core";
  import { localize as L } from '@nativescript/localize'

  import { planJourney } from "~/stores"
  import { CompanionMode } from "~/types"

  function select(mode) {
    $planJourney.companion_mode = mode;
  }

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function onNavigateNext() {
    navigate({
      page: ReminderSelection,
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
    <label text="Bei der Reise ist mir besonders wichtig? " />
    {#each Object.keys(CompanionMode) as mode} }
      <stackLayout>
        <button text="{L('companion_mode.' + CompanionMode[mode])}" on:tap={() => select(CompanionMode[mode])}  />
      </stackLayout>
    {/each}

    <label text="{L('companion_mode._')}: { $planJourney.companion_mode }" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>
</page>

<script type="ts">
  import { navigate, goBack, closeModal } from "svelte-native";
  import { localize as L } from '@nativescript/localize'
  import RouteSelection from "./041_RouteSelection.svelte";
  import { EventData, getRootLayout } from "@nativescript/core";
  import { enumKeys } from "~/shared/utilites";

  import { planJourney } from "~/stores"
  import { PreferredJourneyMode } from "~/types"

  function select(mode: PreferredJourneyMode) {
    $planJourney.preferredJourneyMode = mode;
  }

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function onNavigateNext() {
    navigate({
      page: RouteSelection as any,
      frame: 'planJourneySelection',
    });
  }
  function closeBottomSheet() {
    planJourney.reset();
    closeModal(true);
  }
</script>

<page actionBarHidden={true}  class="bg-default">
  <stackLayout>
    <button text={L('close')} on:tap="{closeBottomSheet}" class="link" />
    <label text="{$planJourney.departure?.icon} {$planJourney.departure?.name} -> {$planJourney.arrival?.icon} {$planJourney.arrival?.name}" textWrap="true" />
    <label text="Bei der Reise ist mir besonders wichtig? " />
    {#each enumKeys(PreferredJourneyMode) as mode} }
      <stackLayout>
        <button text="{L('preffered_journey_mode.' + PreferredJourneyMode[mode])}" on:tap={() => select(PreferredJourneyMode[mode])}  />
      </stackLayout>
    {/each}

    <label text="{L('preffered_journey_mode._')}: { $planJourney.preferredJourneyMode }" />

    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>
</page>

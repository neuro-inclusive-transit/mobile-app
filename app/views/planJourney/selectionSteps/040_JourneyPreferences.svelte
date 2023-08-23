<script type="ts">
  import { navigate, goBack, closeModal } from "svelte-native";
  import { localize as L } from '@nativescript/localize'
  import RouteSelection from "./041_RouteSelection.svelte";
  import { EventData, getRootLayout } from "@nativescript/core";
  import { enumKeys } from "~/shared/utilites";

  import { planJourney } from "~/stores"
  import { PreferredJourneyMode } from "~/types"

  import BigButton from "~/shared/components/BigButton.svelte"

  import {generateIcon} from "~/shared/utils/icons"

  import Button from "~/shared/components/Button.svelte";


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
  <stackLayout class="main-layout">
    <button text={L('close')} on:tap="{closeBottomSheet}" class="link" />
    <label text="{$planJourney.departure?.icon} {$planJourney.departure?.name} -> {$planJourney.arrival?.icon} {$planJourney.arrival?.name}" textWrap="true" />
    <label text="Bei der Reise ist mir besonders wichtig? " />
    {#each enumKeys(PreferredJourneyMode) as mode}
      <stackLayout>
        <BigButton icon={generateIcon(PreferredJourneyMode[mode])} label="{L('preffered_journey_mode.' + PreferredJourneyMode[mode])}" on:tap={() => select(PreferredJourneyMode[mode])} />
      </stackLayout>
    {/each}

    <label text="{L('preffered_journey_mode._')}: { $planJourney.preferredJourneyMode }" />

    <Button text="Zurück" icon="chevron_left" iconPosition="pre" type="secondary" on:tap="{onNavigateBack}" />
    <Button text="Weiter" icon="chevron_right" iconPosition="post" on:tap="{onNavigateNext}" />

  </stackLayout>
</page>

<script type="ts">
  import { navigate, goBack, closeModal } from "svelte-native";
  import { localize as L } from '@nativescript/localize';
  import ReminderSelection from "./060_ReminderSelection.svelte";

  import { planJourney } from "~/stores"
  import { CompanionMode } from "~/types"
  import Button from "~/shared/components/Button.svelte";
  import { enumKeys } from "~/shared/utilites";

  import BigButton from "~/shared/components/BigButton.svelte"

  import {generateIcon} from "~/shared/utils/icons"

  function select(mode: CompanionMode) {
    $planJourney.companionMode = mode;
  }

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function onNavigateNext() {
    navigate({
      page: ReminderSelection as any,
      frame: 'planJourneySelection',
    });
  }
  function closeBottomSheet() {
    planJourney.reset();
    closeModal(true);
  }
</script>

<page actionBarHidden={true} class="bg-default">
  <stackLayout class="main-layout">
    <button text={L('close')} on:tap="{closeBottomSheet}" class="link" />
    <label text="{$planJourney.departure?.icon} {$planJourney.departure?.name} -> {$planJourney.arrival?.icon} {$planJourney.arrival?.name} @ {$planJourney.time.value}" textWrap="true" />
    <label text="Bei der Reise ist mir besonders wichtig? " />
    {#each enumKeys(CompanionMode) as mode} }
      <stackLayout>
        <BigButton icon={generateIcon(CompanionMode[mode])} label="{L('companion_mode.' + CompanionMode[mode])}" on:tap={() => select(CompanionMode[mode])} />
      </stackLayout>
    {/each}

    <label text="{L('companion_mode._')}: { $planJourney.companionMode }" />
    <Button text="Zurück" icon="chevron_left" iconPosition="pre" type="secondary" on:tap="{onNavigateBack}" />
    <Button text="Weiter" icon="chevron_right" iconPosition="post" on:tap="{onNavigateNext}" />

  </stackLayout>
</page>

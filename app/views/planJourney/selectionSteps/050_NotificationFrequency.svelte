<script type="ts" context="module">
  export const id = "selectionStep_NotificationFrequency";
</script>

<script type="ts">
  import { Frame } from "@nativescript/core";
  import { localize as L } from "@nativescript/localize";
  import { showModal } from "svelte-native";

  import SelectionStep from "./SelectionStep.svelte";
  import HelpModal from "./050a_HelpModal.svelte";
  import ReminderSelection from "./060_ReminderSelection.svelte";

  import { planJourney } from "~/stores";
  import { CompanionMode } from "~/types";

  import BigButton from "~/shared/components/BigButton.svelte";
  import { generateIcon } from "~/shared/utils/icons";
  import { enumKeys } from "~/shared/utilites";

  let wrapper: SelectionStep;

  function factoryOnSelect(mode: CompanionMode) {
    return () => {
      $planJourney.companionMode = mode;
    };
  }

  async function openDateModal() {
    await showModal({
      page: HelpModal as any,
      target: Frame.topmost().currentPage,
    });
  }
</script>

<SelectionStep
  nextPage={ReminderSelection}
  bind:this={wrapper}
  showForwards={$planJourney.companionMode !== null}
  showTime={true}
  {id}
>
  <stackLayout class="main-layout">
    <label
      text="Wie sehr sollen wir dich bei der Navigation begleiten?"
      textWrap={true}
      class="fs-l fw-bold m-b-xl"
    />

    <button
      class="link m-b-m"
      text="Was bedeutet das?"
      on:tap={openDateModal}
    />

    {#each enumKeys(CompanionMode) as mode}
      <BigButton
        icon={generateIcon(CompanionMode[mode])}
        label={L("companion_mode." + CompanionMode[mode])}
        on:tap={factoryOnSelect(CompanionMode[mode])}
        class="m-b-m"
        selected={CompanionMode[mode] === $planJourney.companionMode}
      />
    {/each}
  </stackLayout>
</SelectionStep>

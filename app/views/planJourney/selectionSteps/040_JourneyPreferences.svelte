<script type="ts" context="module">
  export const id = "selectionStep_JourneyPreferences";
</script>

<script type="ts">
  import { localize as L } from "@nativescript/localize";

  import SelectionStep from "./SelectionStep.svelte";
  import RouteSelection from "./041_RouteSelection.svelte";

  import { planJourney } from "~/stores";
  import { PreferredJourneyMode } from "~/types";

  import BigButton from "~/shared/components/BigButton.svelte";
  import { generateIcon } from "~/shared/utils/icons";
  import { enumKeys } from "~/shared/utilites";

  let wrapper: SelectionStep;

  function factoryOnSelect(mode: PreferredJourneyMode) {
    return () => {
      $planJourney.preferredJourneyMode = mode;
    };
  }
</script>

<SelectionStep
  nextPage={RouteSelection}
  bind:this={wrapper}
  showForwards={$planJourney.preferredJourneyMode !== null}
  showTime={true}
  {id}
>
  <stackLayout class="main-layout">
    <label
      text="Bei der Reise ist mir besonders wichtig?"
      textWrap={true}
      class="fs-l fw-bold m-b-xl"
    />

    {#each enumKeys(PreferredJourneyMode) as mode}
      <BigButton
        icon={generateIcon(PreferredJourneyMode[mode])}
        label={L("preffered_journey_mode." + PreferredJourneyMode[mode])}
        on:tap={factoryOnSelect(PreferredJourneyMode[mode])}
        class="m-b-m"
        selected={PreferredJourneyMode[mode] ===
          $planJourney.preferredJourneyMode}
      />
    {/each}

    <button
      text="Mir egal"
      class="link m-t-m"
      on:tap={() => {
        factoryOnSelect(
          PreferredJourneyMode[enumKeys(PreferredJourneyMode)[0]],
        )();
        wrapper.navForwards();
      }}
    />
  </stackLayout>
</SelectionStep>

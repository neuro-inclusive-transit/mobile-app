<script type="ts" context="module">
  export const id = "selectionStep_Confirmation";
</script>

<script type="ts">
  import { closeModal } from "svelte-native";

  import SelectionStep from "./SelectionStep.svelte";
  import Confirmation from "./070_Confirmation.svelte";

  import Button from "~/shared/components/Button.svelte";

  import { planJourney, journeys } from "~/stores";
  import { printDate, getTime } from "~/shared/utils/time";

  let wrapper: SelectionStep;

  function saveToJourneys() {
    if (
      $planJourney.departure === null ||
      $planJourney.arrival === null ||
      $planJourney.preferredRoute === null ||
      $planJourney.preferredRoute.sections.length === 0 ||
      $planJourney.companionMode === null ||
      $planJourney.reminderBefore === null
    ) {
      return;
    }

    journeys.save({
      departure: $planJourney.departure,
      arrival: $planJourney.arrival,
      reminderBefore: $planJourney.reminderBefore,
      companionMode: $planJourney.companionMode,
      sections: $planJourney.preferredRoute.sections,
    });
  }

  function closeBottomSheet() {
    planJourney.reset();
    closeModal(true);
  }
</script>

<SelectionStep
  nextPage={Confirmation}
  bind:this={wrapper}
  {id}
  on:navigatedTo={saveToJourneys}
>
  <label
    slot="header"
    text="Super!"
    textWrap={true}
    class="fs-xxl fw-bold color-primary m-b-l"
  />

  <stackLayout class="main-layout fs-l">
    <label
      text="Du hast deine Reise von {$planJourney.departure
        ?.name} nach {$planJourney.arrival?.name} geplant"
      textWrap="true"
      class="m-b-m"
    />

    <label
      text="Du musst {printDate(
        new Date($planJourney.preferredRoute?.sections[0].departure?.time ?? 0),
      ).toLowerCase()} um {getTime(
        new Date($planJourney.preferredRoute?.sections[0].departure?.time ?? 0),
      )} Uhr los. Wir erinnern dich {$planJourney.reminderBefore} Minuten vorher."
      textWrap="true"
    />
  </stackLayout>

  <gridLayout slot="footer" columns="*, auto, *" rows="auto">
    <Button
      text="Zu deinen geplanten Reisen"
      icon="travel_explore"
      row={0}
      column={1}
      on:tap={closeBottomSheet}
      class="m-b-xl"
      iconPosition="pre"
    />
  </gridLayout>
</SelectionStep>

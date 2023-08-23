<script type="ts">
  import { goBack, closeModal } from "svelte-native";
  import { localize as L } from '@nativescript/localize'
  import { EventData, getRootLayout } from "@nativescript/core";

  import { journeys, planJourney } from "~/stores"
  import { CompanionMode, JourneyPlanMode, PreferredJourneyMode, PreferredTransportation } from "~/types"
  import Button from "~/shared/components/Button.svelte";

  // TODO: Preference

  // save & reset
  const plannedJourney = Object.assign({}, $planJourney);

  if ($planJourney.departure !== null && $planJourney.arrival !== null && $planJourney.preferredRoute !== null) {
    journeys.save({
      departure: $planJourney.departure,
      arrival: $planJourney.arrival,
      time: $planJourney.time,
      reminderBefore: $planJourney.reminderBefore,
      companionMode: $planJourney.companionMode,
      sections: $planJourney.preferredRoute.sections,
    });
  }

  planJourney.reset();

  function onNavigateBack() {
    goBack({
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

    <label text="Super!" />
    <label text="Du hast deine Reise von {plannedJourney.departure?.name} nach {plannedJourney.arrival?.name} geplant" textWrap="true" />
    <label text="Du musst {plannedJourney.time.value} los. Wir erinnern dich!" textWrap="true" />
    <Button text="Zurück" icon="chevron_left" on:tap="{onNavigateBack}" iconPosition="pre" type="secondary" />

  </stackLayout>
</page>

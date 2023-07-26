<script type="ts">
  import { goBack } from "svelte-native";
  import { localize as L } from '@nativescript/localize'
  import { EventData, getRootLayout } from "@nativescript/core";

  import { journeys, planJourney } from "~/stores"
  import { CompanionMode, JourneyPlanMode, PreferredJourneyMode, PreferredTransportation } from "~/types"

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

  function closeBottomSheet(args: EventData) {
    getRootLayout().notify({
      eventName: "hideBottomSheet",
      object: args.object,
      eventData: {}
    })
  }
</script>

<page actionBarHidden={true}  class="bg-default">
  <stackLayout>
    <button text={L('close')} on:tap="{closeBottomSheet}" class="link" />

    <label text="Super!" />
    <label text="Du hast deine Reise von {plannedJourney.departure?.name} nach {plannedJourney.arrival?.name} geplant" textWrap="true" />
    <label text="Du musst {plannedJourney.time.value} los. Wir erinnern dich!" textWrap="true" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
  </stackLayout>
</page>

<script>
  import { goBack } from "svelte-native";
  import { getRootLayout } from "@nativescript/core";
  import * as Intl from "nativescript-intl";

  import { journeys, planJourney } from "~/stores"
  import { CompanionMode, JourneyPlanMode, PreferredJourneyMode, PreferredTransportation } from "~/types"

  const dateFormat = new Intl.DateTimeFormat('de', {'year': 'numeric', 'month': 'short', 'day': 'numeric', timeStyle: 'short'})

  // TODO: Preference

  // reset
  const plannedJourney = Object.assign({}, $planJourney);
  planJourney.reset();

  function onNavigateBack() {
    goBack({
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

    <label text="Super!" />
    <label text="Du hast deine Reise von {plannedJourney.departure?.name} nach {plannedJourney.departure?.name} geplant" textWrap="true" />
    <label text="Du musst {plannedJourney.time.value} los. Wir erinnern dich!" textWrap="true" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
  </stackLayout>
</page>

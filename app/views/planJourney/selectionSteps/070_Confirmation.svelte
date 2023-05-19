<script>
  import { goBack } from "svelte-native";
  import { getRootLayout } from "@nativescript/core";
  import * as Intl from "nativescript-intl";

  import { planJourney } from "~/stores"

  const dateFormat = new Intl.DateTimeFormat('de', {'year': 'numeric', 'month': 'short', 'day': 'numeric', timeStyle: 'short'})

  // TODO: Preference

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
    <label text="Du hast deine Reise von {$planJourney.departure?.name} nach {$planJourney.departure?.name} geplant" textWrap="true" />
    <label text="Du musst {$planJourney.time.value} los. Wir erinnern dich!" textWrap="true" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
  </stackLayout>
</page>

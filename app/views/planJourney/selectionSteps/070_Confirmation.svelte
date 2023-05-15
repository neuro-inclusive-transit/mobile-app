<script>
  import { goBack } from "svelte-native";
  import * as Intl from "nativescript-intl";

  export let arrival;
  export let departure;
  export let departureTime;

  const diff = Math.floor((departureTime - new Date()) / 1000 / 60 / 60 / 24); // in days

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
    <label text="Du hast deine Reise von {departure.name} nach {arrival.name} geplant" textWrap="true" />
    <label text="Du musst {dateFormat.format(departureTime)} los. Wir erinnern dich!" textWrap="true" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
  </stackLayout>
</page>

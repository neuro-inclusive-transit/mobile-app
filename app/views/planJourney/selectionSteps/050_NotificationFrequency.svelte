<script>
  import { navigate, goBack } from "svelte-native";
  import ReminderSelection from "./060_ReminderSelection.svelte";
  import { getRootLayout } from "@nativescript/core";

  export let arrival;
  export let departure;
  export let departureTime;

  // TODO: Preference

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function onNavigateNext() {
    navigate({
      page: ReminderSelection,
      frame: 'planJourneySelection',
      props: {
        arrival,
        departure,
        departureTime
      }
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
    <label text="{departure.name} -> {arrival.name} @ {departureTime}" textWrap="true" />
    <label text="Wie sehr sollen wir dich bei der Navigation begleiten?" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>
</page>

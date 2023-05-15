<script>
  import { navigate, goBack } from "svelte-native";
  import JourneyPreferences from "./040_JourneyPreferences.svelte";
  import { getRootLayout } from "@nativescript/core";

  export let arrival;
  export let departure;
  export let departureTime = new Date();

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function onNavigateNext() {
    navigate({
      page: JourneyPreferences,
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
    <label text="{departure.name} -> {arrival.name}" textWrap="true" />
    <label text="Wann startest du deine Reise?" />
    <timePicker bind:time="{departureTime}" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>


</page>

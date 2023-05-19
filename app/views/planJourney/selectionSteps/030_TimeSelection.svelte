<script>
  import { navigate, goBack } from "svelte-native";
  import JourneyPreferences from "./040_JourneyPreferences.svelte";
  import { getRootLayout } from "@nativescript/core";

  import { planJourney } from "~/stores"

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function onNavigateNext() {
    navigate({
      page: JourneyPreferences,
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
    <label text="{$planJourney.departure?.name} -> {$planJourney.departure?.name}" textWrap="true" />
    <label text="Wann startest du deine Reise?" />
    <!-- TODO: select ob departure or arrival time -->
    <timePicker bind:time="{$planJourney.time.value}" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>


</page>

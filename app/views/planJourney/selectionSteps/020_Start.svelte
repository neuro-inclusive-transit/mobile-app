<script>
  import { goBack, navigate } from "svelte-native";
  import TimeSelection from "./030_TimeSelection.svelte";
  import { getRootLayout } from "@nativescript/core";

  export let arrival;
  // export let departure;

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection'
    });
  }

  function onNavigateNext() {
    navigate({
      page: TimeSelection,
      frame: 'planJourneySelection',
      props: { arrival, departure: { name: "Aktueller Standort" } }
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
    <label text="Zielort:" />
    <label text="{arrival.name}" textWrap="true" />
    <label text="Von wo startest du deine Reise?" />
    <button text="Aktueller Standort" on:tap="{onNavigateNext}" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
  </stackLayout>


</page>

<script>
  import { goBack, navigate } from "svelte-native";
  import TimeSelection from "./030_TimeSelection.svelte";
  import { getRootLayout } from "@nativescript/core";

  import { planJourney } from "~/stores"

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection'
    });
  }

  function onNavigateNext() {
    $planJourney.departure = {
      id: -1,
      name: "Aktueller Standort",
      location: { // Get initial location
        lat: 50.880382,
        lng: 7.119409
      },
      icon: "📍",
      currentLocation: true,
    }

    navigate({
      page: TimeSelection,
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
    <label text="Zielort:" />
    <label text="{$planJourney.arrival?.icon} {$planJourney.arrival?.name}" textWrap="true" />
    <label text="Von wo startest du deine Reise?" />
    <button text="Aktueller Standort" on:tap="{onNavigateNext}" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
  </stackLayout>


</page>

<script type="ts">
  import { goBack, navigate } from "svelte-native";
  import TimeSelection from "./030_TimeSelection.svelte";
  import { getRootLayout, EventData } from "@nativescript/core";

  import { planJourney } from "~/stores"

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection'
    });
  }

  function onNavigateNext() {
    $planJourney.departure = {
      name: "Aktueller Standort",
      location: { // Get initial location
        lat: 50.880382,
        lng: 7.119409
      },
      icon: "📍",
      currentLocation: true,
    }

    navigate({
      page: TimeSelection as any, // Type not compatible
      frame: 'planJourneySelection',
    });
  }

  function closeBottomSheet(args : EventData) {
    getRootLayout().notify({
      eventName: "hideBottomSheet",
      object: args.object,
      eventData: {}
    })
  }
</script>

<page actionBarHidden={true}  class="bg-default">
  <stackLayout>
    <button text="Close" on:tap="{closeBottomSheet}" />
    <label text="Zielort:" />
    <label text="{$planJourney.arrival?.icon} {$planJourney.arrival?.name}" textWrap="true" />
    <label text="Von wo startest du deine Reise?" />
    <button text="Aktueller Standort" on:tap="{onNavigateNext}" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
  </stackLayout>


</page>

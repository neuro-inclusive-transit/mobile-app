<script type="ts">
  import { navigate, goBack } from "svelte-native";
  import JourneyPreferences from "./040_JourneyPreferences.svelte";
  import { getRootLayout, EventData } from "@nativescript/core";
  import DepartureDestinationSwitcher from "~/shared/components/DepartureDestinationSwitcher.svelte";

  import { planJourney } from "~/stores"

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function onNavigateNext() {
    navigate({
      page: JourneyPreferences as any, // Type not compatible
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
  function onSwitchValues() {
    let tmp = $planJourney.departure
    $planJourney.departure = $planJourney.arrival
    $planJourney.arrival = tmp
  }

</script>

<page actionBarHidden={true}  class="bg-default">
  <stackLayout>
    <button text="Close" on:tap="{closeBottomSheet}" />
    <DepartureDestinationSwitcher departure="{$planJourney.departure?.name}" destination="{$planJourney.arrival?.name}" on:switchValues={onSwitchValues} />
    <label text="Wann startest du deine Reise?" />
    <!-- TODO: select ob departure or arrival time -->
    <timePicker bind:time="{$planJourney.time.value}" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>


</page>

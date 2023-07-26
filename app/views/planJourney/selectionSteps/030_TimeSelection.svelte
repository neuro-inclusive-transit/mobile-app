<script type="ts">
  import { navigate, goBack } from "svelte-native";
  import { localize as L } from '@nativescript/localize'
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

  let timePickerValue = $planJourney.time.value;
  let datePickerValue = $planJourney.time.value;

  $: $planJourney.time.value = new Date(
    datePickerValue.getFullYear(),
    datePickerValue.getMonth(),
    datePickerValue.getDate(),
    timePickerValue.getHours(),
    timePickerValue.getMinutes(),
    timePickerValue.getSeconds(),
    timePickerValue.getMilliseconds()
  );

</script>

<page actionBarHidden={true}  class="bg-default">
  <stackLayout>
    <button text={L('close')} on:tap="{closeBottomSheet}" class="link" />
    <DepartureDestinationSwitcher departure="{$planJourney.departure?.name}" destination="{$planJourney.arrival?.name}" on:switchValues={onSwitchValues} />
    <label text="Wann startest du deine Reise?" />
    <!-- TODO: select ob departure or arrival time -->
    <datePicker bind:date={datePickerValue} minDate={new Date()} />
    <timePicker bind:time={timePickerValue} />
    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>


</page>

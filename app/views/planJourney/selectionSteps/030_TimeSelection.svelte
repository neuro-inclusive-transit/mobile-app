<script type="ts">
  import { showModal } from "svelte-native";
  import { Frame } from "@nativescript/core";

  import SelectionStep from "./SelectionStep.svelte";
  import JourneyPreferences from "./040_JourneyPreferences.svelte";
  import DatePicker from "./DatePicker.svelte";

  import DepartureDestinationSwitcher from "~/shared/components/DepartureDestinationSwitcher.svelte";
  import Button from "~/shared/components/Button.svelte";

  import { getTime, isToday, isTomorrow, printDate } from "~/shared/utils/time";

  import { planJourney } from "~/stores";

  async function openDateModal() {
    datePickerValue = await showModal({ page: DatePicker as any, target: Frame.topmost().currentPage, props: { date: $planJourney.time.value }});
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

  $: isTodayOrTomorrow = isToday($planJourney.time.value) || isTomorrow($planJourney.time.value);

  function setToday() {
    datePickerValue = new Date();
  }

  function setTomorrow() {
    datePickerValue = new Date(new Date().setDate(new Date().getDate() + 1));
  }

</script>

<SelectionStep nextPage={JourneyPreferences}>
  <DepartureDestinationSwitcher slot="header" departure="{$planJourney.departure?.name}" destination="{$planJourney.arrival?.name}" on:switchValues={onSwitchValues} />

  <gridLayout class="main-layout" columns="*" rows="auto, auto, *, auto">
    <label text="Wann startest du deine Reise?" textWrap={true} class="fs-l m-b-m"/>

    <gridLayout columns="*, *, auto" class="m-b-m" row={1}>
      <Button column={0} text={isTodayOrTomorrow ? 'Heute' : 'H'} class="m-r-s" type={(isToday($planJourney.time.value) ? 'primary' : 'secondary')} on:tap={setToday} />
      <Button column={1} text={isTodayOrTomorrow ? 'Morgen' : 'M'} type={(isTomorrow($planJourney.time.value) ? 'primary' : 'secondary')} class="m-r-s" on:tap={setTomorrow}/>
      <Button column={2} text={(isTodayOrTomorrow ? '' : printDate($planJourney.time.value))} type={isTodayOrTomorrow ? 'secondary' : 'primary'} icon="calendar_month" on:tap={openDateModal} iconPosition="pre"/>
    </gridLayout>

    <!-- TODO: select ob departure or arrival time -->
    <timePicker bind:time={timePickerValue} iosPreferredDatePickerStyle="1" row={2} />

    <label text={$planJourney.time.value.toJSON()} textWrap={true} class="fs-xs m-b-m" row={3} />

  </gridLayout>

</SelectionStep>

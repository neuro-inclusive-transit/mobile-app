<script type="ts">
  import { onMount, tick } from "svelte";
  import { showModal } from "svelte-native";
  import { Frame, isAndroid, isIOS, TimePicker, EventData } from "@nativescript/core";

  import SelectionStep from "./SelectionStep.svelte";
  import JourneyPreferences from "./040_JourneyPreferences.svelte";
  import DatePicker from "./030a_DatePicker.svelte";

  import Button from "~/shared/components/Button.svelte";

  import { isToday, isTomorrow, printDate } from "~/shared/utils/time";

  import { planJourney } from "~/stores";
  import { JourneyPlanMode } from "~/types";

  let timePicker: TimePicker;

  async function openDateModal() {
    datePickerValue = await showModal({ page: DatePicker as any, target: Frame.topmost().currentPage, props: { date: $planJourney.time.value }});
  }

  let timePickerValue = $planJourney.time.value;
  let datePickerValue = $planJourney.time.value;

  $: {
    let timePickerValueToday = timePickerValue;

    timePickerValueToday.setDate(new Date().getDate());
    timePickerValueToday.setMonth(new Date().getMonth());
    timePickerValueToday.setFullYear(new Date().getFullYear());


    if (isToday(datePickerValue) && timePickerValue < new Date()) {
      timePickerValue = new Date();
    }

    $planJourney.time.value = new Date(
      datePickerValue.getFullYear(),
      datePickerValue.getMonth(),
      datePickerValue.getDate(),
      timePickerValue.getHours(),
      timePickerValue.getMinutes(),
      timePickerValue.getSeconds(),
      timePickerValue.getMilliseconds()
    );
  }

  $: isTodayOrTomorrow = isToday($planJourney.time.value) || isTomorrow($planJourney.time.value);

  let liveDate = new Date();

  onMount(() => {
    const interval = setInterval(() => {
      liveDate = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  });

  $: minHour = isToday($planJourney.time.value) ? liveDate.getHours() : 0;
  $: minMinute = isToday($planJourney.time.value) ? liveDate.getMinutes() : 0;

  function setToday() {
    datePickerValue = new Date();
  }

  function setTomorrow() {
    datePickerValue = new Date(new Date().setDate(new Date().getDate() + 1));
  }

  let renderTimePicker = true;
  $: reMountTimePicker(minHour, minMinute);

  async function reMountTimePicker(..._: any[]) {
    renderTimePicker = false;
    await tick();
    renderTimePicker = true;
  }

</script>

<script type="ts" context="module">
  export const id = 'selectionStep_TimeSelection';
</script>

<SelectionStep nextPage={JourneyPreferences} {id}>

  <gridLayout class="main-layout" columns="*" rows="auto, auto, *">
    <label text={(() => {
      switch ($planJourney.time.type) {
        case JourneyPlanMode.Arrival:
          return 'Wann möchtest du ankommen?';
        case JourneyPlanMode.Departure:
        default:
          return 'Wann möchtest du losfahren?';
      }
    })()} textWrap={true} class="fs-l m-b-m"/>

    <gridLayout columns="*, *, auto"  class="m-b-m" row={1}>
      <Button column={0} text={isTodayOrTomorrow ? 'Heute' : 'H'} class="m-r-s" type={(isToday($planJourney.time.value) ? 'primary' : 'secondary')} on:tap={setToday} />
      <Button column={1} text={isTodayOrTomorrow ? 'Morgen' : 'M'} type={(isTomorrow($planJourney.time.value) ? 'primary' : 'secondary')} class="m-r-s" on:tap={setTomorrow}/>
      <Button column={2} text={(isTodayOrTomorrow ? '' : printDate($planJourney.time.value))} type={isTodayOrTomorrow ? 'secondary' : 'primary'} icon="calendar_month" on:tap={openDateModal} iconPosition="pre"/>
    </gridLayout>

    {#if renderTimePicker}
    <timePicker bind:time={timePickerValue} {minHour} {minMinute} iosPreferredDatePickerStyle="1" row={2} bind:this={timePicker} />
    {/if}

  </gridLayout>

</SelectionStep>

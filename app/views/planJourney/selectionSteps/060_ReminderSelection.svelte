<script>
  import { navigate, goBack } from "svelte-native";
  import Confirmation from "./070_Confirmation.svelte";

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
      page: Confirmation,
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
    <label text="Wie viel früher möchtest du vor Reiseantritt erinnert werden?" />
    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>
</page>

<script>
  import { navigate } from "svelte-native";
  import Confirmation from "./070_Confirmation.svelte";
  import Start from "./020_Start.svelte";
  import { getRootLayout } from "@nativescript/core";

  export let arrival;

  function onStartNow() {
    navigate({
      page: Confirmation,
      frame: 'planJourneySelection',
      props: { arrival }
    });
  }

  function onStartLater() {
    navigate({
      page: Start,
      frame: 'planJourneySelection',
      props: { arrival }
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
    <button text="Jetzt Reise Starten" on:tap="{onStartNow}" />
    <button text="Für später planen" on:tap="{onStartLater}" />
  </stackLayout>


</page>

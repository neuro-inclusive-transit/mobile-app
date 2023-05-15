<script>
  import { navigate } from "svelte-native";
  import DestinationConfirm from "./011_DestinationConfirm.svelte";
  import { ActionBar, getRootLayout } from "@nativescript/core";

  function navToNextStep() {
    navigate({
      page: DestinationConfirm,
      frame: 'planJourneySelection'
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

<page >
  <stackLayout backgroundColor="#3c495e">
    <label text="first" height="70" backgroundColor="#43b883" />
    <label text="second" height="70" backgroundColor="#289062" />
    <label text="third" height="70" backgroundColor="#1c6b48" />
    <button text="Close" on:tap="{closeBottomSheet}" />
  </stackLayout>

  <!-- <button text="Weiter" on:tap="{navToNextStep}" /> -->
</page>

<script type="ts">
  import { navigate } from "svelte-native";
  import { Frame, EventData, getRootLayout } from "@nativescript/core";
  import SelectionProcess from "./SelectionProcess.svelte";

  function addJourney(args: EventData) {
    getRootLayout().notify({
      eventName: "showBottomSheet",
      object: args.object,
      eventData: {}
    })
  }

</script>

<page>
  <actionBar title="Deine Reisen" />

  <button text="Reise hinzufügen" on:tap="{addJourney}" />
</page>

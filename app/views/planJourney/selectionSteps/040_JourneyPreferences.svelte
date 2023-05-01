<script>
  import { navigate } from "svelte-native";
  import NotifactionFrequence from "./050_NotifactionFrequence.svelte";

  function onTab() {
    navigate({
      page: NotifactionFrequence,
      frame: 'planJourneySelection'
    });
  }
</script>

<page>
  <actionBar title="Reise Präferenz" />

  <button text="Weiter" on:tap="{onTab}" />
</page>

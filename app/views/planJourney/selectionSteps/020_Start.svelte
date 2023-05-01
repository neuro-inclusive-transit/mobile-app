<script>
  import { navigate } from "svelte-native";
  import TimeSelection from "./030_TimeSelection.svelte";

  function onTab() {
    navigate({
      page: TimeSelection,
      frame: 'planJourneySelection'
    });
  }
</script>

<page>
  <actionBar title="Dein Startort" />

  <button text="Aktuellen Standort" on:tap="{onTab}" />
</page>

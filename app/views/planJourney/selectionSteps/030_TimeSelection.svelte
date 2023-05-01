<script>
  import { navigate } from "svelte-native";
  import JourneyPreferences from "./040_JourneyPreferences.svelte";

  function onTab() {
    navigate({
      page: JourneyPreferences,
      frame: 'planJourneySelection'
    });
  }
</script>

<page>
  <actionBar title="Uhrzeit" />

  <button text="Weiter" on:tap="{onTab}" />
</page>

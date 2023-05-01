<script>
  import { navigate } from "svelte-native";
  import ReminderSelection from "./060_ReminderSelection.svelte";

  function onTab() {
    navigate({
      page: ReminderSelection,
      frame: 'planJourneySelection'
    });
  }
</script>

<page>
  <actionBar title="Benachrichtigung" />

  <button text="Weiter" on:tap="{onTab}" />
</page>

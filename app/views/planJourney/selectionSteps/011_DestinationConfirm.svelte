<script>
  import { navigate } from "svelte-native";
  import Confirmation from "./070_Confirmation.svelte";
  import Start from "./020_Start.svelte";

  function onStartNow() {
    navigate({
      page: Confirmation,
      frame: 'planJourneySelection'
    });
  }

  function onStartLater() {
    navigate({
      page: Start,
      frame: 'planJourneySelection'
    });
  }
</script>

<page>
  <actionBar title="Ziel bestätigen" />

  <button text="Jetzt Reise Starten" on:tap="{onStartNow}" />
  <button text="Für später planen" on:tap="{onStartLater}" />
</page>

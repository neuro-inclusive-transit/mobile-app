<script>
  import { navigate } from "svelte-native";
  import Confirmation from "./070_Confirmation.svelte";

  function onTab() {
    navigate({
      page: Confirmation,
      frame: 'planJourneySelection'
    });
  }
</script>

<page>
  <actionBar title="Erinnerung" />

  <button text="Weiter" on:tap="{onTab}" />
</page>

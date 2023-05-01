<script>
  import { navigate } from "svelte-native";
  import DestinationConfirm from "./011_DestinationConfirm.svelte";

  function navToNextStep() {
    navigate({
      page: DestinationConfirm,
      frame: 'planJourneySelection'
    });
  }
</script>

<page>
  <actionBar title="Dein Ziel" />

  <button text="Weiter" on:tap="{navToNextStep}" />
</page>

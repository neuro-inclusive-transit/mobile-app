<script>
  import { goBack } from "svelte-native";
  import Confirmation from "./070_Confirmation.svelte";

  function onTab() {
    goBack({
      frame: 'tabPlanJourney'
    });
  }
</script>

<page>
  <actionBar title="Done" />

  <button text="Weiter" on:tap="{onTab}" />
</page>

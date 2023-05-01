<script>
  import { navigate } from "svelte-native";
  import SelectionProcess from "./SelectionProcess.svelte";

  function addJourney() {

    console.log(SelectionProcess);
    navigate({
      page: SelectionProcess,
      frame: 'tabPlanJourney'
    });
  }

</script>

<page>
  <actionBar title="Deine Reisen" />

  <button text="Reise hinzufügen" on:tap="{addJourney}" />
</page>

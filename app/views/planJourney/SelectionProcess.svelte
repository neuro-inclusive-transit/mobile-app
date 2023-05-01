<script>
  import { navigate } from "svelte-native";
  import Destination from "./selectionSteps/010_Destination.svelte";

</script>

<page>
  <actionBar title="Selection start" />

  <frame id="planJourneySelection" defaultPage="{Destination}" />
</page>

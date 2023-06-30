<script type="ts">
  import { navigate } from "svelte-native";
  import { journeys } from "~/stores";
  import { liveJourney } from "~/stores/liveJourney";

  import Contacts from "./Contacts.svelte";
  import RouteOverview from "./RouteOverview.svelte";

</script>

<page class="bg-light">
  <actionBar title="Gesamtübersicht" />

  <gridLayout rows="auto,*" columns="*" class="main-layout">

    <label class="fs-l" text="Routenübersicht" row={0} col={0} />

    <scrollView row={1} col={0}>
      <stackLayout>
        {#each $liveJourney?.sections ?? [] as section}
          <label text="{section.transport.mode}" />
        {/each}
      </stackLayout>
    </scrollView>
  </gridLayout>



</page>

<style>
</style>

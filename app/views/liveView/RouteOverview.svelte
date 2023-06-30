<script type="ts">
  import { navigate } from "svelte-native";
  import { journeys } from "~/stores";
  import { liveJourney } from "~/stores/liveJourney";

  import Accordion from "~/shared/components/Accordion.svelte";
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
        <Accordion customClass="m-b-l">
          <label text="{section.transport.mode}" slot="header" />
          <label text="Test Content" slot="content" />
        </Accordion>
        {/each}
      </stackLayout>
    </scrollView>
  </gridLayout>



</page>

<style>
</style>

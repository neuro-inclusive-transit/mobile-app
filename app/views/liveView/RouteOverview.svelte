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

    <label class="fs-l m-b-l" text="Routenübersicht" row={0} col={0} />

    {#if $liveJourney !== null}

    <scrollView row={1} col={0}>
      <stackLayout>
        {#each $liveJourney.sections as section, i}
          {#if section === false}
      
            <label textWrap={true}>
              <formattedString>
                <span class="icon" text="local_cafe" />
                <span text=" " />
                <span class="fw-italic" text="Du hast deine Reise pausiert." />
              </formattedString>
            </label>
      
          {:else}
      
            <Accordion customClass="m-b-s" open={$liveJourney.currentStep === i}>
              <label text="{section.transport.mode}" slot="header" />
              <label text="Test Content" slot="content" />
            </Accordion>
      
          {/if}
        {/each}
      </stackLayout>
    </scrollView>

    {:else}

    <stackLayout row={1} col={0}>
      <label text="Du hast aktuell keine Navigation aktiviert. In dem Menu 'Route planen' kannst du eine Route erstellen und die Navigation starten." textWrap={true} />
      <button text="Reise planen" />
    </stackLayout>

    {/if}

  </gridLayout>



</page>

<style>
</style>

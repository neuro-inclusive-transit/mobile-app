<script lang="ts">
  import LiveView from "~/views/liveView/Main.svelte";
  import Profile from "@/views/Profile.svelte";
  import PlanJourney from "@/views/planJourney/Main.svelte";

  import { tabIndex } from "~/stores";
</script>
<rootLayout backgroundColor="black">
  <tabView androidTabsPosition="bottom" bind:selectedIndex={$tabIndex}>
    <tabViewItem title="Planung">
      <frame id="tabPlanJourney">
        <PlanJourney />
      </frame>
    </tabViewItem>
    <tabViewItem title="Begleitung">
      <frame>
        <LiveView />
      </frame>
    </tabViewItem>
    <tabViewItem title="Profil">
      <frame>
        <Profile />
      </frame>
    </tabViewItem>
  </tabView>
</rootLayout>

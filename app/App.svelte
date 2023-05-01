<tabView androidTabsPosition="bottom">
  <tabViewItem title="Reise planen">
    <frame id="tabPlanJourney">
        <PlanJourney />
    </frame>
  </tabViewItem>
  <tabViewItem title="Live Ansicht">
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

<script lang="ts">
    import LiveView from "./views/LiveView.svelte";
    import Profile from "./views/Profile.svelte";
    import PlanJourney from "./views/planJourney/Main.svelte";
</script>

<script lang="ts">
  import { EventData, Frame, Screen, getRootLayout } from "@nativescript/core";
  import LiveView from "./views/LiveView.svelte";
  import Profile from "./views/Profile.svelte";
  import PlanJourney from "./views/planJourney/Main.svelte";
  import SelectionProcess from "./views/planJourney/SelectionProcess.svelte";

  function onSheetLoaded(args: EventData) {
    const frame = args.object as Frame;

    frame.translateY = Screen.mainScreen.heightDIPs;

    getRootLayout().on('showBottomSheet', () => {
      console.log('showBottomSheet');
      frame.animate({
        translate: { x: 0, y: 200 },
        duration: 1000,
        curve: 'easeIn'
      });
    });
  }
</script>
<rootLayout>
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

  <frame id="sheet" on:loaded={onSheetLoaded} height="50%">
    <SelectionProcess />
  </frame>
</rootLayout>

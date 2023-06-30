<script lang="ts">
  import { EventData, Frame, Screen, getRootLayout } from "@nativescript/core";
  import LiveView from "~/views/liveView/Main.svelte";
  import Profile from "@/views/Profile.svelte";
  import PlanJourney from "@/views/planJourney/Main.svelte";
  import SelectionProcess from "@/views/planJourney/SelectionProcess.svelte";

  import { durations, easings } from "~/shared/motion";

  function onTabViewLoaded(args: EventData) {
    const frame = args.object as Frame;

    getRootLayout().on('showBottomSheet', () => {
      frame.borderRadius = 10;

      frame.animate({
        duration: durations.moderate[1],
        scale: { x: .9, y: .9 },
        opacity: .6,
        curve: easings.standard.expressive
      });
    });

    getRootLayout().on('hideBottomSheet', () => {
      frame.animate({
        duration: durations.moderate[1],
        scale: { x: 1, y: 1 },
        opacity: 1,
        curve: easings.standard.expressive
      }).then(() => {
        frame.borderRadius = 0;
      });
    });
  }

  function onSheetLoaded(args: EventData) {
    const frame = args.object as Frame;

    frame.translateY = Screen.mainScreen.heightDIPs;

    getRootLayout().on('showBottomSheet', () => {
      frame.animate({
        translate: { x: 0, y: 100 },
        duration: durations.moderate[1],
        curve: easings.entrance.expressive
      });
    });

    getRootLayout().on('hideBottomSheet', () => {
      frame.animate({
        translate: { x: 0, y: Screen.mainScreen.heightDIPs },
        duration: durations.moderate[1],
        curve: easings.exit.expressive
      });
    });
  }
</script>
<rootLayout backgroundColor="black">
  <tabView androidTabsPosition="bottom" on:loaded={onTabViewLoaded} >
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

  <frame id="sheet" on:loaded={onSheetLoaded}>
    <SelectionProcess />
  </frame>
</rootLayout>


<style lang="scss">
</style>

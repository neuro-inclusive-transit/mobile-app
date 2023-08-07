<script type="ts">
  import { goBack, navigate, closeModal } from "svelte-native";
  import { localize as L } from '@nativescript/localize'
  import { getRootLayout, EventData } from "@nativescript/core";

  import Confirmation from "./070_Confirmation.svelte";
  import TimeSelection from "./030_TimeSelection.svelte";
  import Destination from "./010_Destination.svelte";

  import { planJourney } from "~/stores"
  import Button from "~/shared/components/Button.svelte";
  import DepartureDestinationSwitcher from "~/shared/components/DepartureDestinationSwitcher.svelte";

  function onPlanNow () {
    $planJourney.time.value = new Date();
    navigate({
      page: Confirmation as any, // Type not compatible
      frame: 'planJourneySelection',
    });
  }

  function onPlanLater () {
    navigate({
      page: TimeSelection as any, // Type not compatible
      frame: 'planJourneySelection',
    });
  }

  function closeBottomSheet() {
    planJourney.reset();
    closeModal(true);
  }
</script>

<page actionBarHidden={true}  class="bg-default">
  <stackLayout class="main-layout">
    <button text={L('close')} on:tap="{closeBottomSheet}" class="link" />
    <DepartureDestinationSwitcher departure={$planJourney.departure?.name} destination={$planJourney.arrival?.name}/>

    <Button content="Jetzt Reise starten" on:tap="{onPlanNow}" />
    <Button content="Für später starten" type="secondary" on:tap="{onPlanLater}" />
  </stackLayout>

</page>

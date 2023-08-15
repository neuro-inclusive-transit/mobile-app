<script type="ts">
  import { navigate, goBack, closeModal } from "svelte-native";
  import { localize as L } from '@nativescript/localize'
  import { getRootLayout, EventData } from "@nativescript/core";
  import Confirmation from "./070_Confirmation.svelte";
  import Button from "~/shared/components/Button.svelte";
  import { planJourney } from "~/stores"

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function onNavigateNext() {
    navigate({
      page: Confirmation as any,
      frame: 'planJourneySelection',
    });
  }
  function closeBottomSheet() {
    planJourney.reset();
    closeModal(true);
  }

  let timeOptions = [
    10,
    30,
    60,
  ]
</script>

<page actionBarHidden={true}  class="bg-default">
  <stackLayout class="main-layout">
    <button text={L('close')} on:tap="{closeBottomSheet}" class="link" />
    <label text="{$planJourney.departure?.icon} {$planJourney.departure?.name} -> {$planJourney.arrival?.icon} {$planJourney.arrival?.name} @ {$planJourney.time.value}" textWrap="true" />
    <label text="Wie viel früher möchtest du vor Reiseantritt erinnert werden?" />
    {#each timeOptions as option} }
      <stackLayout>
        <button text="{option} Min." on:tap={() => {$planJourney.reminderBefore = option}}  />
      </stackLayout>
    {/each}
    <!-- TODO: selbst eintragen -->
    <Button text="Zurück" icon="chevron_left" iconPosition="pre" type="secondary" on:tap="{onNavigateBack}" />
    <Button text="Weiter" icon="chevron_right" iconPosition="post" on:tap="{onNavigateNext}" />

  </stackLayout>
</page>

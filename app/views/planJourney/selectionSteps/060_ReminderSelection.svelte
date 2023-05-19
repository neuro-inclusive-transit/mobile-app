<script>
  import { navigate, goBack } from "svelte-native";
  import Confirmation from "./070_Confirmation.svelte";

  import { planJourney } from "~/stores"

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function onNavigateNext() {
    navigate({
      page: Confirmation,
      frame: 'planJourneySelection',
    });
  }
  function closeBottomSheet(args) {
    getRootLayout().notify({
      eventName: "hideBottomSheet",
      object: args.object,
      eventData: {}
    })
  }

  let timeOptions = [
    10,
    30,
    60,
  ]
</script>

<page actionBarHidden=true>
  <stackLayout>
    <button text="Close" on:tap="{closeBottomSheet}" />
   <label text="{$planJourney.departure?.name} -> {$planJourney.departure?.name} @ {$planJourney.time.value}" textWrap="true" />
    <label text="Wie viel früher möchtest du vor Reiseantritt erinnert werden?" />
    {#each timeOptions as option} }
      <stackLayout>
        <button text="{option} Min." on:tap={() => {$planJourney.reminderBefore = option}}  />
      </stackLayout>
    {/each}
    <!-- TODO: selbst eintragen -->
    <button text="Zurück" on:tap="{onNavigateBack}" />
    <button text="Weiter" on:tap="{onNavigateNext}" />
  </stackLayout>
</page>

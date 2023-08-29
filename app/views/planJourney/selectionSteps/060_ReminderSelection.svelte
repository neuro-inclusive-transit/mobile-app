<script type="ts">
  import SelectionStep from "./SelectionStep.svelte";
  import Confirmation from "./070_Confirmation.svelte";

  import { planJourney } from "~/stores";

  import BigButton from "~/shared/components/BigButton.svelte";

  let wrapper: SelectionStep;

  let timeOptions = [
    10,
    30,
    60,
  ]

  function factoryOnSelect(option: number) {
    return () => {
      $planJourney.reminderBefore = option;
      wrapper.navForwards();
    }
  }

</script>

<script type="ts" context="module">
  export const id = 'selectionStep_NotificationFrequency';
</script>

<SelectionStep nextPage={Confirmation} bind:this={wrapper} showForwards={false} showTime={true} {id}>

  <stackLayout class="main-layout">
    <label text="Wie viel früher möchtest du vor Reiseantritt erinnert werden?" textWrap={true} class="fs-l fw-bold m-b-xl"/>

    {#each timeOptions as option}
      <BigButton label="{option.toString() + " Minuten"}" on:tap={factoryOnSelect(option)} class="m-b-m"/>
    {/each}
  </stackLayout>

</SelectionStep>

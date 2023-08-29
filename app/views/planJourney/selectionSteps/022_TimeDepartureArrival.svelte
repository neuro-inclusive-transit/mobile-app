<script type="ts">
  import SelectionStep from "./SelectionStep.svelte";
  import TimeSelection from "./030_TimeSelection.svelte";

  import { planJourney } from "~/stores";
  import { JourneyPlanMode } from "~/types";

  import BigButton from "~/shared/components/BigButton.svelte";
  let wrapper: SelectionStep;

  function onArrivalTime () {
    $planJourney.time.type = JourneyPlanMode.Arrival;
    wrapper.navForwards();
  }

  function onDepartureTime () {
    $planJourney.time.type = JourneyPlanMode.Departure;
    wrapper.navForwards();
  }
</script>

<script type="ts" context="module">
  export const id = 'selectionStep_TimeDepartureArrival';
</script>

<SelectionStep nextPage={TimeSelection} bind:this={wrapper} showForwards={false} {id}>

  <stackLayout class="main-layout">
    <label text="Von welchem Zeitpunkt ist deine Reise abhängig?" textWrap={true} class="fs-l fw-bold m-b-xl"/>
    <BigButton icon="login" label="Ankunftszeit festlegen" on:tap="{onArrivalTime}" class="m-b-m" />
    <BigButton icon="logout" label="Zeit zum losgehen festlegen" on:tap="{onDepartureTime}" />
  </stackLayout>

</SelectionStep>

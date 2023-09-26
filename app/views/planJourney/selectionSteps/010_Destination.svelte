<script type="ts" context="module">
  export const id = "selectionStep_Destination";
</script>

<script type="ts">
  import SelectionStep from "./SelectionStep.svelte";
  import Start from "./020_Start.svelte";

  import Place from "~/shared/components/Place.svelte";
  import Input from "~/shared/components/Input.svelte";

  import type { Place as StorePlace } from "~/stores/places";
  import { planJourney, places } from "~/stores";

  let wrapper: SelectionStep;

  function formatAddress(address: StorePlace["address"]) {
    if (!address) return "";

    return `${address.street}, ${address.postcode} ${address.city}`;
  }

  function onPlaceTapFactory(place: StorePlace) {
    return () => {
      $planJourney.arrival = place;

      wrapper.navForwards();
    };
  }
</script>

<SelectionStep
  nextPage={Start}
  bind:this={wrapper}
  showBackwards={false}
  showForwards={false}
  {id}
>
  <label
    slot="header"
    text="Neue Reise planen"
    textWrap={true}
    class="fs-l fw-bold"
  />

  <stackLayout class="main-layout">
    <label
      text="Ziel aus deinen Favoriten"
      textWrap={true}
      class="fs-l m-b-m"
    />
    {#each $places.filter((place) => place !== $planJourney.departure) as place}
      <Place
        customIcon={place.icon}
        name={place.name}
        address={place.address ? formatAddress(place.address) : ""}
        class="m-b-m"
        on:tap={onPlaceTapFactory(place)}
      />
    {/each}

    <label text="Anderes Ziel" class="fs-l m-b-m m-t-l" />
    <Input text="Suche nach Ort" pre="search" class="m-b-m" elevated />
  </stackLayout>
</SelectionStep>

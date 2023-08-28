<script type="ts">
  import { CoreTypes } from "@nativescript/core";
  import * as geolocation from '@nativescript/geolocation'

  import { planJourney, places, Place as StorePlace } from "~/stores"

  import Place from "~/shared/components/Place.svelte";
  import Input from "~/shared/components/Input.svelte";

  import Start from "./020_Start.svelte";
  import SelectionStep from "./SelectionStep.svelte";

  let wrapper: SelectionStep;

  function formatAddress(address: StorePlace['address']) {
    if (!address) return '';

    return `${address.street}, ${address.postcode} ${address.city}`;
  }

  function onPlaceTapFactory(place: StorePlace) {
    return () => {
      $planJourney.departure = place;

      wrapper.navForwards();
    }
  }

  async function getCurrentLocation() {
    await geolocation.enableLocationRequest();

    const currentLocation = await geolocation.getCurrentLocation({
      desiredAccuracy: CoreTypes.Accuracy.high,
      maximumAge: 5000,
      timeout: 20000
    })

    // TODO: convert to address

    return [
        {
          name: 'Aktueller Standort',
          location: {
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          },
          icon: '📍',
          currentLocation: true,
        },
      ];
  }

</script>

<SelectionStep nextPage={Start} bind:this={wrapper}>
  <label slot="header" text="Deine Reise nach {$planJourney.arrival?.name ?? formatAddress($planJourney.arrival?.address)}" textWrap={true} class="fs-l fw-bold"/>

  <stackLayout class="main-layout">
    <label text="Von wo startest du deine Reise" textWrap={true} class="fs-l m-b-m"/>

    {#await getCurrentLocation()}
      ...Lade Standort
    {:then locations}
      {#each locations as location}
        <Place customIcon={location.icon} name={location.name} address="{location.location.lat} / {location.location.lng}" class="m-b-m" on:tap={onPlaceTapFactory(location)}/>
      {/each}
    {:catch}
      <Place customIcon="📍" name="Aktueller Standort" address="Standort konnte nicht ermittelt werden" />
    {/await}

    <label text="Anderer Startpunkt" class="fs-l m-b-m m-t-l" />
    <Input text="Suche nach Ort" pre="search" class="m-b-m" elevated />

    {#each $places as place}
      <Place customIcon={place.icon} name={place.name} address={place.address ? formatAddress(place.address) : ''} class="m-b-m" on:tap={onPlaceTapFactory(place)}/>
    {/each}
  </stackLayout>

</SelectionStep>

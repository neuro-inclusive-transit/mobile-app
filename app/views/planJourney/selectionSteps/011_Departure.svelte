<script type="ts">
  import { navigate, goBack } from "svelte-native";
  import { Template } from 'svelte-native/components'
  import { localize as L } from '@nativescript/localize'
  import { getRootLayout, EventData, CoreTypes, ItemEventData } from "@nativescript/core";
  import * as geolocation from '@nativescript/geolocation'

  import { planJourney, places, Place as StorePlace } from "~/stores"

  import Place from "~/shared/components/Place.svelte";
  import Input from "~/shared/components/Input.svelte";
  import Button from "~/shared/components/Button.svelte";

  import Confirmation from "./070_Confirmation.svelte";
  import Start from "./020_Start.svelte";

  function formatAddress(address: StorePlace['address']) {
    if (!address) return '';

    return `${address.street}, ${address.postcode} ${address.city}`;
  }

  function select (place: StorePlace) {
    $planJourney.departure = place;

    navigate({
      page: Start as any, // Type not compatible
      frame: 'planJourneySelection',
    });
  }

  function onItemTap(places: StorePlace[]){
    return function (args: ItemEventData) {
      const place = places[args.index];

      select(place);
    }
  }

  function onTapBack () {
    goBack();
  }

  function closeBottomSheet(args: EventData) {
    getRootLayout().notify({
      eventName: "hideBottomSheet",
      object: args.object,
      eventData: {}
    })
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

<page actionBarHidden={true} class="bg-default">
  <stackLayout>
    <button text={L('close')} on:tap="{closeBottomSheet}" class="link" />
    <label text="Zielort:" class="fs-l fw-bold"/>
    <label text="{$planJourney.arrival?.icon} {$planJourney.arrival?.name}" textWrap={true}  class="fs-l fw-bold m-b-m"/>

    <label text="Von wo startest du deine Reise?" class="fs-l m-b-m" textWrap={true} />

    {#await getCurrentLocation()}
      ...Lade Standort
    {:then location}
      <listView items="{location}" height=100 separatorColor="transparent" on:itemTap={onItemTap(location)}>
        <Template let:item>
          <Place customIcon={item.icon} name={item.name} address="{item.location.lat} / {item.location.lng}" />
        </Template>
      </listView>
    {:catch}
      <Place customIcon="📍" name="Aktueller Standort" address="Standort konnte nicht ermittelt werden" />
    {/await}

    <label text="Anderen Startpunkt" class="fs-l m-b-m m-t-l" textWrap={true} />

    <Input hint="Dein Startpunkt" pre="search" elevated />

    <listView items="{$places}" height=300 separatorColor="transparent" on:itemTap={onItemTap($places)}>
      <Template let:item>
        <Place customIcon={item.icon} name={item.name} address={item.address ? formatAddress(item.address) : ''} />
      </Template>
    </listView>

    <Button content="Zurück" icon="chevron_left" ButtonOrder="XButton" on:tap={onTapBack} />
  </stackLayout>
</page>

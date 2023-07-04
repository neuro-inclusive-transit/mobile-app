<script type="ts">
  import { navigate } from "svelte-native";
  import { Template } from 'svelte-native/components'
  import { localize as L } from '@nativescript/localize'
  import Departure from "./011_Departure.svelte";
  import { getRootLayout, ItemEventData, EventData } from "@nativescript/core";

  import Place from "~/shared/components/Place.svelte";
  import Input from "~/shared/components/Input.svelte";

  import type { Place as StorePlace } from "~/stores/places";

  import { planJourney, places } from "~/stores"

  function formatAddress(address: StorePlace['address']) {
    if (!address) return '';

    return `${address.street}, ${address.postcode} ${address.city}`;
  }

  function select (place: StorePlace) {
    $planJourney.arrival = place;

    navigate({
      page: Departure as any, // Type not compatible
      frame: 'planJourneySelection',
    });
  }

  function onItemTap (args: ItemEventData) {
    const place = $places[args.index];

    select(place);
  }

  function closeBottomSheet(args: EventData) {
    getRootLayout().notify({
      eventName: "hideBottomSheet",
      object: args.object,
      eventData: {}
    })
  }
</script>

<page class="bg-default">
  <stackLayout>
    <button text={L('close')} on:tap="{closeBottomSheet}" class="link" />
    <label text="Deine Favoriten" class="fs-l fw-bold"/>
    <listView items="{$places}" height=300 separatorColor="transparent" on:itemTap={onItemTap}>
      <Template let:item>
        <Place customIcon={item.icon} name={item.name} address={item.address ? formatAddress(item.address) : ''} />
      </Template>
    </listView>

    <label text="Anderes Ziel" class="fs-l fw-bold" />

    <Input hint="Dein Ziel" pre="search" elevated />
  </stackLayout>

  <!-- <ButtonX content="Weiter" icon="chevron_right" on:tap="{navToNextStep}" /> -->
</page>

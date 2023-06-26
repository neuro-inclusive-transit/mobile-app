<script type="ts">
  import { navigate } from "svelte-native";
  import { Template } from 'svelte-native/components'
  import DestinationConfirm from "./011_DestinationConfirm.svelte";
  import { getRootLayout, EventData } from "@nativescript/core";

  import Place from "~/shared/components/Place.svelte";
  import type { Place as StorePlace } from "~/stores/places";

  import { planJourney, places } from "~/stores"

  function formatAddress(address: StorePlace['address']) {
    if (!address) return '';

    return `${address.street}, ${address.postcode} ${address.city}`;
  }

  function select (place: StorePlace) {
    $planJourney.arrival = place;

    navigate({
      page: DestinationConfirm as any, // Type not compatible
      frame: 'planJourneySelection',
    });
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
    <button text="Close" on:tap="{closeBottomSheet}" />
    <label text="Deine Favoriten" class="fs-l fw-bold"/>
    <listView items="{$places}" height=300>
      <Template let:item>
        <Place customIcon={item.icon} name={item.name} address={item.address ? formatAddress(item.address) : ''} on:tap="{() => select(item)}" />
      </Template>
    </listView>

    <label text="Test: {$planJourney.arrival?.name}" />

    <label text="Anderes Ziel" />
  </stackLayout>

  <!-- <button text="Weiter" on:tap="{navToNextStep}" /> -->
</page>

<script>
  import { navigate } from "svelte-native";
  import { Template } from 'svelte-native/components'
  import DestinationConfirm from "./011_DestinationConfirm.svelte";
  import { getRootLayout } from "@nativescript/core";

  import { planJourney, places } from "~/stores"

  function formatAddress(address) {
    return `${address.street}, ${address.postcode} ${address.city}`;
  }

  function select (place) {
    $planJourney.arrival = place;

    navigate({
      page: DestinationConfirm,
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
</script>

<page>
  <stackLayout>
    <button text="Close" on:tap="{closeBottomSheet}" />
    <label text="Deine Favoriten" />
    <listView items="{$places}" height=300>
      <Template let:item>
        <stackLayout on:tap="{select(item)}">
          <label text="{item.icon} {item.name}" />
          <label text="{item.address ? formatAddress(item.address) : ''}" textWrap="true" />
        </stackLayout>
      </Template>
    </listView>

    <label text="Test: {$planJourney.arrival?.name}" />

    <label text="Anderes Ziel" />
  </stackLayout>

  <!-- <button text="Weiter" on:tap="{navToNextStep}" /> -->
</page>

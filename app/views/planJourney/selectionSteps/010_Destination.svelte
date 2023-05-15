<script>
  import { navigate } from "svelte-native";
  import { Template } from 'svelte-native/components'
  import DestinationConfirm from "./011_DestinationConfirm.svelte";
  import { getRootLayout } from "@nativescript/core";

  let favorites = [
    {
      name: "Zuhause",
      address: "Musterstraße 1, 12345 Musterstadt"
    },
    {
      name: "Arbeit",
      address: "Musterstraße 2, 12345 Musterstadt"
    },
    {
      name: "Uni",
      address: "Musterstraße 3, 12345 Musterstadt"
    }
  ];

  function navToNextStep(adresse) {
    navigate({
      page: DestinationConfirm,
      frame: 'planJourneySelection',
			props: { arrival: adresse }
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
    <listView items="{favorites}" height=300>
      <Template let:item>
        <stackLayout on:tap="{navToNextStep(item)}">
          <label text="{item.name}" />
          <label text="{item.address}" />
        </stackLayout>
      </Template>
    </listView>

    <label text="Anderes Ziel" />
  </stackLayout>

  <!-- <button text="Weiter" on:tap="{navToNextStep}" /> -->
</page>

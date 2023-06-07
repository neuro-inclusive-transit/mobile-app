<script type="ts">
  import { navigate } from "svelte-native";
  import { Frame, EventData, getRootLayout } from "@nativescript/core";

  import Button from "~/shared/components/Button.svelte";
  import Place from "~/shared/components/Place.svelte";
  // import Search from "~/shared/components/Search.svelte";
  import DepartureDestinationSwitcher from "~/shared/components/DepartureDestinationSwitcher.svelte";

  import { journeys } from "~/stores";

  function addJourney(args: EventData) {
    getRootLayout().notify({
      eventName: "showBottomSheet",
      object: args.object,
      eventData: {}
    })
  }

</script>

<page>
  <actionBar title="Meine Reisen" />

  <stackLayout>
    {#each $journeys as journey}
      <stackLayout>
        <label text="{journey.departure.place.name} -> {journey.arrival.place.name} @ {journey.departure.time}" />
      </stackLayout>
    {/each}
    <label text="BACKEND_SERVICE_ROUTE_URL {process.env.BACKEND_SERVICE_ROUTE_URL}" />
    <button text="Reise hinzufügen" on:tap="{addJourney}" />


    <DepartureDestinationSwitcher departure='Köln Zoo' destination='Gummersbach Bahnhof'/>


    <Button type='secondary' icon='&#xf806' inhalt='rock on' />

    <Place customIcon='🤟🏽' name='Rock Hall' address='Boulevard of broken dreams' />

    <!-- <Search hinweis='Gib ein Ziel ein...' icon='&#xf55f'/> -->

    <Button icon='&#xf124' inhalt='Jetzt Reise starten' />

    <Button icon='' type='line' inhalt='Abbrechen' />


  </stackLayout>

</page>

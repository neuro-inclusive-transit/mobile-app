<script type="ts">
  import { navigate, goBack } from "svelte-native";
  import { Template } from 'svelte-native/components'
  import NotificationFrequency from "./050_NotificationFrequency.svelte";
  import { getRootLayout, EventData, StackLayout } from "@nativescript/core";
  import { localize as L } from '@nativescript/localize'

  import { planJourney } from "~/stores"
  import { CompanionMode } from "~/types"

  import { routeApi, HereApiRoute } from "~/api";
  import Route from "~/shared/components/Route.svelte";
  import { time } from "@nativescript/core/profiling";
    import { globals } from "~/shared/sizes";
    import DepartureDestinationSwitcher from "~/shared/components/DepartureDestinationSwitcher.svelte";

  function select(route: HereApiRoute) {
    console.log('select', route);

    $planJourney.preferredRoute = route;

    navigate({
      page: NotificationFrequency as any, // Type not compatible
      frame: 'planJourneySelection',
    });
  }

  let numOfAlternatives = 3;

  $: $planJourney.options = routeApi.get({
    origin: {
      lat: $planJourney.departure?.location.lat ?? 0,
      lng: $planJourney.departure?.location.lng ?? 0,
    },
    destination: {
      lat: $planJourney.arrival?.location.lat ?? 0,
      lng: $planJourney.arrival?.location.lng ?? 0,
    },
    departureTime: $planJourney.time.value, // TODO: switch departureTime / arrivalTime depending on the direction
    alternatives: numOfAlternatives,
  });


  function onRouteSelect(args: EventData) {
    console.log('onRouteSelect', args);
  }

  function onNavigateBack() {
    goBack({
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

  function hereRouteSectionToGenericSection(sections: HereApiRoute['sections']) {
    return sections.map((section) => ({
      type: section.type,
      begin: new Date(section.departure.time),
      end: new Date(section.arrival.time),
      transport_name: section.transport.name,
    }));
  }
</script>

<page actionBarHidden={true}  class="bg-default">
  <gridLayout marginLeft={globals.outerPadding} marginRight={globals.outerPadding} columns="*" rows="auto, auto, auto, auto, auto, *, auto, auto">
    <button text="Abbrechen" on:tap="{closeBottomSheet}" row={0} col={0} />

    <DepartureDestinationSwitcher row={1} col={0}
      departure="{$planJourney.departure?.name}"
      destination="{$planJourney.arrival?.name}"
      on:switchValues />

    <label text="Aufbruchszeit: {$planJourney.time.value}" row={2} col={0} />

    <label text="Schnellste Routenoptionen" class="fs-l" row={3} col={0} />

    {#await $planJourney.options}
      <label row={4} col={0}>...waiting</label>
    {:then routes}
      <listView items={routes} on:itemTap={onRouteSelect} row={4} col={0}>
        <Template let:item={route}>
          <Route
            departureTime={new Date(route.sections[0].departure.time)}
            arrivalTime={new Date(route.sections[route.sections.length - 1].arrival.time)}
            route={hereRouteSectionToGenericSection(route.sections)} />
        </Template>
      </listView>
    {:catch error}
      <label style="color: red" row={4} col={0}>{error}</label>
    {/await}
    <button text="More Routes" on:tap="{() => numOfAlternatives += 3}" row={5} col={0} />

    <button text="Zurück" on:tap="{onNavigateBack}" row={6} col={0} />
  </gridLayout>
</page>

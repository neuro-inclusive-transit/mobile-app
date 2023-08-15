<script type="ts">
  import { navigate, goBack, closeModal } from "svelte-native";
  import { localize as L } from '@nativescript/localize'
  import { Template } from 'svelte-native/components'
  import NotificationFrequency from "./050_NotificationFrequency.svelte";
  import { getRootLayout, EventData, ItemEventData, Page } from "@nativescript/core";

  import { planJourney } from "~/stores"
  import { CompanionMode } from "~/types"

  import { routeApi, HereApiRoute } from "~/api";
  import Route from "~/shared/components/Route.svelte";

  import { calcDurationBetween, printTime, getTime } from "~/shared/utils/time"

  import { globals } from "~/shared/sizes";
  import DepartureDestinationSwitcher from "~/shared/components/DepartureDestinationSwitcher.svelte";
    import { onMount } from "svelte";
    import Button from "~/shared/components/Button.svelte";

  function select(route: HereApiRoute) {
    console.log('select', route);

    $planJourney.preferredRoute = route;

    navigate({
      page: NotificationFrequency as any, // Type not compatible
      frame: 'planJourneySelection',
    });
  }

  let numOfAlternatives = 3;
  let crowdPercentage = 0.5;


  function calculateOptions() {
    if ($planJourney.departure && $planJourney.arrival) {
      $planJourney.options = routeApi.get({
        origin: {
          lat: $planJourney.departure.location.lat,
          lng: $planJourney.departure.location.lng,
        },
        destination: {
          lat: $planJourney.arrival.location.lat,
          lng: $planJourney.arrival.location.lng,
        },
        departureTime: $planJourney.time.value,
        alternatives: numOfAlternatives,
      });
    }
  }

  function onRouteSelectFactory(list: HereApiRoute[]) {
    return (args: ItemEventData) => {
      select(list[args.index]);
    }
  }

  function onNavigateBack() {
    goBack({
      frame: 'planJourneySelection',
    });
  }
  function closeBottomSheet() {
    planJourney.reset();
    closeModal(true);
  }

  function hereRouteSectionToGenericSection(sections: HereApiRoute['sections']) {
    return sections.map((section) => ({
      type: section.transport.mode,
      begin: new Date(section.departure.time),
      end: new Date(section.arrival.time),
      transport_name: section.transport.name,
    }));
  }
</script>

<page actionBarHidden={true} class="bg-default" on:navigatingTo={calculateOptions}>
  <gridLayout class="main-layout" columns="*" rows="auto, auto, auto, auto, *, auto, auto">
    <button text={L('close')} on:tap="{closeBottomSheet}" row={0} col={0} class="link" />

    <DepartureDestinationSwitcher row={1} col={0}
      departure="{$planJourney.departure?.name}"
      destination="{$planJourney.arrival?.name}"
      on:switchValues />

    <label text="Aufbruchszeit: {$planJourney.time.value}" row={2} col={0} />

    <label text="Schnellste Routenoptionen" class="fs-l" row={3} col={0} />

    {#await $planJourney.options}
      <label row={4} col={0}>...waiting</label>
    {:then routes}
      <listView items={routes} on:itemTap={onRouteSelectFactory(routes)} row={4} col={0}>
        <Template let:item={route}>
          <Route
            route={hereRouteSectionToGenericSection(route.sections)}>
            <label col={1} row={0} class="icon color-primary" slot="crowdPercentage" text={
              (crowdPercentage > 0.3 ? "person" : "person_outline")
              + (crowdPercentage > 0.6 ? "person" : "person_outline")
              + (crowdPercentage > 0.9 ? "person" : "person_outline")
            } />
            <stackLayout col={0} row={0} slot="maininfo">
              <label text="{printTime(calcDurationBetween(new Date(route.sections[0].departure.time), new Date(route.sections[route.sections.length-1].departure.time)))}" />
              <label text="Aufbruch {getTime(new Date(route.sections[0].departure.time))} Uhr" />
            </stackLayout>
          </Route>
        </Template>
      </listView>
    {:catch error}
      <label style="color: red" row={4} col={0}>{error}</label>
    {/await}

    <stackLayout row={5} col={0}>
      <Button text="Mehr Routen" on:tap="{() => {numOfAlternatives += 3; calculateOptions()}}" />
    </stackLayout>


    <stackLayout row={6} col={0}>
      <Button text="Zurück" icon="chevron_left" on:tap="{onNavigateBack}" iconPosition="pre" type="secondary" />
     </stackLayout>


  </gridLayout>
</page>

<script type="ts">
  import { navigate } from "svelte-native";
  import { confirm } from '@nativescript/core/ui/dialogs'
  import { journeys } from "~/stores";
  import { liveJourney } from "~/stores/liveJourney";
  import { routeApi,  } from "~/api";

  import Contacts from "./Contacts.svelte";
  import RouteOverview from "./RouteOverview.svelte";

  $liveJourney = {
    ...$journeys[0], // TODO: only on user interaction
    isPaused: false,
    currentStep: 0
  };

  $: currentLocation = $liveJourney === null ? null : ((section) => {
    if (section === false) return null;
    return {
      lat: section.departure.place.location.lat,
      lng: section.departure.place.location.lng,
    };
  })($liveJourney.sections[$liveJourney.currentStep]);


  // resolved when route calculation is finished
  // TODO: use a store instead
  let calculateNewJourney = new Promise((resolve) => {
    resolve(null);
  });

  function simulateNextStep() {
    if ($liveJourney === null) return;

    if ($liveJourney.currentStep >= $liveJourney.sections.length - 1) {
      $liveJourney.currentStep = 0;
      return;
    }

    do {
      $liveJourney.currentStep++;
    } while ($liveJourney.sections[$liveJourney.currentStep] === false);

  }

  function openRouteOverview() {
    navigate({
      page: RouteOverview as any
    });
  }

  async function togglePause() {
    if ($liveJourney === null) return;

    if (!$liveJourney.isPaused) {
      const confirmPause = await confirm({
        title: 'Navigation pausieren',
        message: 'Brauchst du eine Pause?',
        okButtonText: 'Ja',
        cancelButtonText: 'Route fortsetzen',
      });

      if (confirmPause) {
        // TODO: stop notification
        $liveJourney.isPaused = true;
        return;
      }
    }

    $liveJourney.isPaused = false;

    // TODO: Check if next step is reachable

    calculateNewJourney = new Promise(async (resolve) => {

      if ($liveJourney == null) {
        resolve(null);
        return;
      }

      console.log('calculate new journey');

      const nextOptions = await routeApi.get({
        origin: currentLocation ? currentLocation : { lat: 0, lng: 0 },
        destination: $liveJourney.arrival.location,
        departureTime: new Date(),
        alternatives: 1,
      });

      console.log('nextOptions', nextOptions);

      $liveJourney = {
        ...$liveJourney,
        sections: [
          ...$liveJourney.sections.slice(0, $liveJourney.currentStep + 1),
          false,
          ...nextOptions[0].sections,
        ],
        currentStep: 0,
      };

      console.log('new live journey', $liveJourney);

      resolve(null);
    });
  }

  /* live:
  $: currentSection = currentLive.sections.findIndex((section) => {
    const now = new Date();
    const begin = new Date(section.departure.time);
    const end = new Date(section.arrival.time);
    return begin <= now && now <= end;
  });
  */
  /* debug: */
  $: currentSection = $liveJourney?.sections[$liveJourney.currentStep];
</script>

<page class="bg-default">
  <actionBar title="Live-Ansicht" />

  {#if $liveJourney === null || currentSection === undefined || currentSection === false}

  <stackLayout class="main-layout">
    <label text="route" class="icon fs-xxl" />
    <label text='Du hast aktuell keine Navigation aktiviert. In dem Menu "Route planen" kannst du eine Route erstellen und die Navigation starten.' textWrap={true} />
    <button text="Reise planen" />
  </stackLayout>

  {:else}

    {#await calculateNewJourney}
      <stackLayout class="main-layout">
        <label text="route" class="icon fs-xxl" />
        <label text='Deine Route wird berechnet...' textWrap={true} />
      </stackLayout>
    {:then _}

      <gridLayout columns="*" rows="auto, auto, *, auto, auto" class="main-layout">

      {#if $liveJourney.isPaused}

      <label text="Pause" textWrap={true} row={0} rowSpan={3} class="bg-primary-light" />

      {:else}

      <label text="Zwischenziel: {currentSection.arrival.place.name ?? currentSection.arrival.place.location.lat + '/' + currentSection.arrival.place.location.lng} // Fortbewegung: {currentSection.transport.mode} // Ankunft: {new Date(currentSection.arrival.time).toLocaleTimeString()} " textWrap={true} row={0} class="bg-primary-light" />

      <label text="turn_left" class="icon fs-3xl" on:tap={simulateNextStep} row={1}  />

      <label text="Karte tbd." row={2}  />

      {/if}

      <button text="Gesamtübersicht anzeigen" row={3} on:tap={openRouteOverview} />
      <flexboxLayout class="bg-primary-light color-primary" row={4} >
        <button text="local_cafe" class="icon" on:tap={togglePause}/>
        <button text="contacts" class="icon" />
        <button text="warning" class="icon" />
        <button text="volume_off" class="icon" />
      </flexboxLayout>
    </gridLayout>

    {/await}






  {/if}
</page>

<style>
</style>

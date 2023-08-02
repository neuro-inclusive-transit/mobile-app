<script type="ts">
  import { navigate } from "svelte-native";
  import { confirm } from '@nativescript/core/ui/dialogs'
  import { journeys, liveJourney } from "~/stores";
  import { routeApi,  } from "~/api";

  import Contacts from "./Contacts.svelte";
  import RouteOverview from "./RouteOverview.svelte";

  import Map from "~/shared/components/Map.svelte";

  $liveJourney = {
    ...$journeys[0], // TODO: only on user interaction
    isPaused: false,
    currentSection: 0,
    currentAction: 0,
  };

  $: currentLocation = $liveJourney === null ? null : ((section) => {
    if (section === false) return null;
    return {
      lat: section.departure.place.location.lat,
      lng: section.departure.place.location.lng,
    };
  })($liveJourney.sections[$liveJourney.currentSection]);


  // resolved when route calculation is finished
  // TODO: use a store instead
  let calculateNewJourney = new Promise((resolve) => {
    resolve(null);
  });

  function simulateNextStep() {
    if ($liveJourney === null) return;


    if (currentSection && currentSection.actions && currentSection.actions.length > $liveJourney.currentAction + 1) {
      $liveJourney.currentAction++;
      return;
    }

    if ($liveJourney.currentSection >= $liveJourney.sections.length - 1) {
      $liveJourney.currentSection = 0;
      $liveJourney.currentAction = 0;
      return;
    }

    do {
      $liveJourney.currentSection++;
      $liveJourney.currentAction = 0;
    } while ($liveJourney.sections[$liveJourney.currentSection] === false);

  }

  function getActionIcon(action: string, direction?: string) {
    if (action === 'depart') return 'start';
    if (action === 'arrive') return 'flag';
    if (action === 'continue') return 'straight';
    if (action === 'roundaboutExit' && direction === 'left') return 'roundabout_right';
    if (action === 'roundaboutExit' && direction === 'right') return 'roundabout_left';
    if (action === 'turn' && direction === 'left') return 'turn_left';
    if (action === 'turn' && direction === 'right') return 'turn_right';
    return 'next_plan';
  }

  function openRouteOverview() {
    navigate({
      page: RouteOverview as any
    });
  }

  function openContacts() {
    navigate({
      page: Contacts as any
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
          ...$liveJourney.sections.slice(0, $liveJourney.currentSection + 1),
          false,
          ...nextOptions[0].sections,
        ],
        currentSection: $liveJourney.currentSection + 2,
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
  $: currentSection = $liveJourney?.sections[$liveJourney.currentSection];
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

      <label text="Die Routenführung wurde gestoppt. Steige an der nächsten Haltestelle aus und mache eine Pause" textWrap={true} row={0} rowSpan={3} class="bg-primary-light" />

      <button text="Gesamtübersicht anzeigen" row={3} on:tap={openRouteOverview} />
      <flexboxLayout class="bg-primary-light color-primary" row={4} >
        <button text="Pause beenden" on:tap={togglePause} />
        <button text="call" class="icon" on:tap={openContacts} />
        <button text="warning" class="icon" />
      </flexboxLayout>

      {:else}

      <label text="Zwischenziel: {currentSection.arrival.place.name ?? currentSection.arrival.place.location.lat + '/' + currentSection.arrival.place.location.lng} {currentSection.actions ? currentSection.actions[$liveJourney.currentAction].instruction : 'Keine Aktion'}" textWrap={true} row={0} class="bg-primary-light" />


      {#if currentSection.transport.mode === 'pedestrian'}
        <label text="{currentSection.actions ? getActionIcon(
          currentSection.actions[$liveJourney.currentAction].action,
          currentSection.actions[$liveJourney.currentAction].direction
        ): 'warning'}" class="icon fs-3xl text-center" on:tap={simulateNextStep} row={1}  />

        <Map row={2} />

      {:else}
        <label class="icon text-center" on:tap={simulateNextStep} row={1} >
          <formattedString>
            <span text="directions_walk" class="fs-3xl" />
            <span text="arrow_forward" />
            <span text="door_sliding" class="fs-3xl" />
          </formattedString>
        </label>
        <label text="train" row={2}  />
      {/if}


      <button text="Gesamtübersicht anzeigen" row={3} on:tap={openRouteOverview} />
      <flexboxLayout class="bg-primary-light color-primary" row={4}>
        <button text="local_cafe" class="icon" on:tap={togglePause} />
        <button text="contacts" class="icon" on:tap={openContacts} />
        <button text="warning" class="icon" />
        <button text="volume_off" class="icon" />
      </flexboxLayout>

      {/if}


    </gridLayout>

    {/await}
  {/if}
</page>

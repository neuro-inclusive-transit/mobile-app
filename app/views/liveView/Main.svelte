<script type="ts">
  import { navigate } from "svelte-native";
  import { tick } from 'svelte';
  import { confirm } from '@nativescript/core/ui/dialogs'
  import { journeys, liveJourney, multiModality } from "~/stores";
  import { routeApi,  } from "~/api";
  import { speak } from "~/shared/utils/tts";
  import { playSound } from "~/shared/utils/audio";

  import Contacts from "./Contacts.svelte";
  import RouteOverview from "./RouteOverview.svelte";
  import SupportBox from "~/shared/components/SupportBox.svelte";
  import Button from "~/shared/components/Button.svelte";

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

  async function simulateNextStep() {
    if ($liveJourney === null) return;


    if (currentSection && currentSection.actions && currentSection.actions.length > $liveJourney.currentAction + 1) {
      $liveJourney.currentAction++;
      await tick();
      await playAction();
      return;
    }

    if ($liveJourney.currentSection >= $liveJourney.sections.length - 1) {
      $liveJourney.currentSection = 0;
      $liveJourney.currentAction = 0;
      await tick();
      await playAction();
      return;
    }

    // skip sections that are false (e.g. user has paused the journey)
    do {
      $liveJourney.currentSection++;
      $liveJourney.currentAction = 0;
    } while ($liveJourney.sections[$liveJourney.currentSection] === false);
    await tick();
    await playAction();
  }

  async function playAction () {
    if (
      $liveJourney === null
      || currentSection === false || currentSection === undefined
      || !Array.isArray(currentSection.actions) || currentSection.actions.length === 0
    ) return;

    const action = currentSection.actions[$liveJourney.currentAction];

    // TODO: sound does not work
    await playSound("passiveNotification");

    return speak(action.instruction);
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

  function toggleAudio() {
    if ($multiModality.primary === 'auditory') {
      $multiModality.primary = 'visual';
      return;
    }

    $multiModality.primary = 'auditory';
    playAction();
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

      <SupportBox text="Die Routenführung wurde gestoppt. Steige an der nächsten Haltestelle aus und mache eine Pause" textWrap={true} row={0} type={$multiModality.primary === 'auditory' ? 'big' : 'small'} class="m-b-m" />

      <label text="{'local_cafe'}" class="icon text-center {$multiModality.primary === 'auditory' ? 'fs-4xl' : 'fs-3xl'}" row={1}  />

      <gridLayout row={3} columns="*, auto, *">
         <Button text="Gesamtübersicht anzeigen"  icon="route" iconPosition="pre" type="secondary"  column={1} on:tap={openRouteOverview} class="m-b-m {$multiModality.primary === 'auditory' ? 'fs-l' : ''}" />
      </gridLayout>


      <gridLayout columns="*, *, *, *, *" rows="auto" row={4} class="m-b-m p-s bg-primary-light border-radius">
        <Button column={0} columnSpan={3} text="Pause beendet" icon="local_cafe" iconPosition="pre" on:tap={togglePause} />
        <Button column={3} icon="contacts" on:tap={openContacts} class="m-l-s"/>
        <Button column={4} icon={$multiModality.primary === 'auditory' ? 'volume_up' : 'volume_off'} class="m-l-s" on:tap={toggleAudio} />
      </gridLayout>

      {:else}

      <SupportBox row={0} text="{currentSection.actions ? currentSection.actions[$liveJourney.currentAction].instruction : 'Keine Aktion'}" type={$multiModality.primary === 'auditory' ? 'big' : 'small'} class="m-b-m" />

      {#if currentSection.transport.mode === 'pedestrian'}

        <label text="{currentSection.actions ? getActionIcon(
          currentSection.actions[$liveJourney.currentAction].action,
          currentSection.actions[$liveJourney.currentAction].direction
        ): 'warning'}" class="icon text-center {$multiModality.primary === 'auditory' ? 'fs-4xl' : 'fs-3xl'}" on:tap={simulateNextStep} row={1}  />

        <label text="Karte tbd. Zwischenziel: {currentSection.arrival.place.name ?? currentSection.arrival.place.location.lat + '/' + currentSection.arrival.place.location.lng}" textWrap={true} row={2}  />

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


      <gridLayout row="3" columns="*, auto, *">
        <Button text="Gesamtübersicht anzeigen" icon="route" iconPosition="pre" type="secondary" column={1} on:tap={openRouteOverview} class="m-b-m {$multiModality.primary === 'auditory' ? 'fs-l' : ''}"/>
      </gridLayout>
      <gridLayout columns="*, *, *, *, *" rows="auto" row={4} class="m-b-m p-s bg-primary-light border-radius">
        <Button column={0} columnSpan={2} text="Pause" icon="local_cafe" iconPosition="pre" on:tap={togglePause} />
        <Button column={2} icon="contacts" on:tap={openContacts} class="m-l-s"/>
        <Button column={3} icon="warning" class="m-l-s" />
        <Button column={4} icon={$multiModality.primary === 'auditory' ? 'volume_up' : 'volume_off'} class="m-l-s" on:tap={toggleAudio} />
      </gridLayout>

      {/if}


    </gridLayout>

    {/await}
  {/if}
</page>

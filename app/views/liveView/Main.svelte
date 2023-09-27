<script type="ts">
  import { navigate, showModal } from "svelte-native";
  import { tick } from 'svelte';
  import { confirm } from '@nativescript/core/ui/dialogs'
  import { tabIndex, liveJourney, multiModality } from "~/stores";
  import { routeApi,  } from "~/api";
  import { speak } from "~/shared/utils/tts";
  import { playSound } from "~/shared/utils/index";
  import { transportTypeToIcon } from "~/shared/utilites";

  import Contacts from "./Contacts.svelte";
  import RouteOverview from "./RouteOverview.svelte";
  import SupportBox from "~/shared/components/SupportBox.svelte";
  import Button from "~/shared/components/Button.svelte";
  import TrainProgressComponent from "~/shared/components/TrainProgressComponent.svelte";

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


    // iterate actions
    if (currentSection && currentSection.actions && currentSection.actions.length > $liveJourney.currentAction + 1) {
      $liveJourney.currentAction++;
      if ($multiModality.primary === 'auditory') {
        await tick();
        await playAction();
      }
      return;
    }

    // iterate intermediate stops
    if (currentSection && currentSection.intermediateStops && currentSection.intermediateStops.length > $liveJourney.currentIntermediateStop + 1) {
      $liveJourney.currentIntermediateStop++;
      if ($multiModality.primary === 'auditory') {
        await tick();
        await playAction();
      }
      return;
    }

    // start over again if we reached the end of the journey
    if ($liveJourney.currentSection >= $liveJourney.sections.length - 1) {
      $liveJourney.isCompleted = true;
      return;
    }

    // skip sections that are false (e.g. user has paused the journey)
    do {
      $liveJourney.currentSection++;
    } while ($liveJourney.sections[$liveJourney.currentSection] === false);

    $liveJourney.currentAction = 0;
    $liveJourney.currentIntermediateStop = 0;

    if ($multiModality.primary === 'auditory') {
      await tick();
      await playAction();
    }
  }

  async function playAction () {
    await playSound("passiveNotification");

    return speak(currentSupportBoxText);
  }

  function getActionIcon(action: string, direction?: string) {
    if (action === 'depart') return 'start';
    if (action === 'arrive') return 'flag';
    if (action === 'continue') return 'straight';
    if (action === 'roundaboutExit' && direction === 'right') return 'roundabout_right';
    if (action === 'roundaboutExit' && direction === 'left') return 'roundabout_left';
    if (action === 'roundaboutEnter' && direction === 'right') return 'roundabout_right';
    if (action === 'roundaboutEnter' && direction === 'left') return 'roundabout_left';
    if (action === 'turn' && direction === 'left') return 'turn_left';
    if (action === 'turn' && direction === 'right') return 'turn_right';
    console.log('action', action, direction);
    return 'next_plan';
  }

  function openRouteOverview() {
    console.log('open route overview');
    showModal({
      page: RouteOverview as any
    });
  }

  function openContacts() {
    showModal({
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

  let currentSupportBoxText = '';

  $: if ($liveJourney && currentSection) {
    if ($liveJourney.isPaused) {
      currentSupportBoxText = "Die Routenführung wurde gestoppt. Steige an der nächsten Haltestelle aus und mache eine Pause.";
    } else if ($liveJourney.isCompleted) {
      currentSupportBoxText = "Sehr gut du hast dein Ziel erreicht.";
    } else if (currentSection.actions && currentSection.actions.length > 0) {
      currentSupportBoxText = currentSection.actions[$liveJourney.currentAction].instruction;
    } else if (currentSection.intermediateStops) {
      let id = $liveJourney.currentIntermediateStop;
      let stop = currentSection.intermediateStops[id];

      if (currentSection.intermediateStops.length === 0) {
        currentSupportBoxText = `Steige bei ${currentSection.departure.place.name} in die ${currentSection.transport.name} Richtung ${currentSection.transport.headsign} ein und steige bei ${currentSection.arrival.place.name} wieder aus.`;
      } else {
        switch (id) {
          case 0:
            currentSupportBoxText = `Steige bei ${stop.departure.place.name} in die ${currentSection.transport.name} Richtung ${currentSection.transport.headsign} ein.`;
            break;
          case currentSection.intermediateStops.length - 1:
            currentSupportBoxText = `Gehe zum Ausgang und steige bei ${currentSection.arrival.place.name} aus.`;
            break;
          default:
            currentSupportBoxText = `Du bist im richtigen Transportmittel.`;
            break;
        }
      }


    } else {
      currentSupportBoxText = `Du musst von {currentSection.departure.place.name} nach {currentSection.arrival.place.name}`;
    }
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
  <actionBar title="Begleitung" />

  {#if $liveJourney === null || currentSection === undefined || currentSection === false}

  <gridLayout rows="*, *, *" padding="20">
    <label text="route" class="icon fs-xxl" verticalAlignment="top" horizontalAlignment="center" />
    <label text='Du hast aktuell keine Navigation aktiviert. In dem Menü "Planung" kannst du eine Route erstellen und die Navigation starten.' textWrap="true" verticalAlignment="middle"/>
    <button text="Route planen" verticalAlignment="bottom"/>
  </gridLayout>


  {:else}

    {#await calculateNewJourney}
      <stackLayout class="main-layout">
        <label text="route" class="icon fs-xxl" />
        <label text='Deine Route wird berechnet...' textWrap={true} />
      </stackLayout>
    {:then _}

    <gridLayout columns="*" rows="auto, auto, *, auto, auto" class="main-layout">

      {#if $liveJourney.isPaused}

      <SupportBox text={currentSupportBoxText} row={0} type={$multiModality.primary === 'auditory' ? 'big' : 'small'} class="m-b-m" />

      <label text="{'motion_photos_paused'}" class="icon text-center {$multiModality.primary === 'auditory' ? 'fs-4xl' : 'fs-3xl'}" row={1}  />

      <gridLayout row={3} columns="*, auto, *">
         <Button text="Gesamtübersicht anzeigen"  icon="route" iconPosition="pre" type="secondary"  column={1} on:tap={openRouteOverview} class="m-b-m {$multiModality.primary === 'auditory' ? 'fs-l' : ''}" />
      </gridLayout>


      <gridLayout columns="*, *, *, *, *" rows="auto" row={4} class="m-b-m p-s bg-primary-light border-radius">
        <Button column={0} columnSpan={3} text="Pause vorbei" icon="check_circle_outline" iconPosition="pre" on:tap={togglePause} />
        <Button column={3} icon="contacts" on:tap={openContacts} class="m-l-s"/>
        <Button column={4} icon={$multiModality.primary === 'auditory' ? 'volume_up' : 'volume_off'} class="m-l-s" on:tap={toggleAudio} />
      </gridLayout>

      {:else if $liveJourney.isCompleted}

      <SupportBox row={0} text={currentSupportBoxText} type={$multiModality.primary === 'auditory' ? 'big' : 'small'} class="m-b-m" />

      <label text="place" class="icon text-center fs-4xl" on:tap={simulateNextStep} row={1} rowSpan={2}  />

      <gridLayout row="3" columns="*, auto, *" rowSpan={2}>
          <Button text="Zur Reisen-Übersicht" icon="travel_explore" iconPosition="pre" type="primary" column={1} on:tap={() => {
            $tabIndex = 0;
            $liveJourney = null;
          }} class="m-b-m {$multiModality.primary === 'auditory' ? 'fs-l' : ''}"/>
      </gridLayout>

      {:else}

        {#if currentSection.actions && currentSection.actions.length > 0}

          <SupportBox row={0} text="{currentSupportBoxText}" type={$multiModality.primary === 'auditory' ? 'big' : 'small'} class="m-b-m" />

          <label text="{currentSection.actions ? getActionIcon(
            currentSection.actions[$liveJourney.currentAction].action,
            currentSection.actions[$liveJourney.currentAction].direction
          ): 'warning'}" class="icon text-center {$multiModality.primary === 'auditory' ? 'fs-4xl' : 'fs-3xl'}" on:tap={simulateNextStep} row={1}  />

          <label text="Karte tbd. Zwischenziel: {currentSection.arrival.place.name ?? currentSection.arrival.place.location.lat + '/' + currentSection.arrival.place.location.lng}" textWrap={true} row={2}  />

        {:else if currentSection.intermediateStops}

          <SupportBox row={0} text={currentSupportBoxText} type={$multiModality.primary === 'auditory' ? 'big' : 'small'} class="m-b-m" />

          <label class="icon text-center fs-3xl" on:tap={simulateNextStep} row={1} text={(() => {
            let id = $liveJourney.currentIntermediateStop;
            let stop = currentSection.intermediateStops[id];

            if (currentSection.intermediateStops.length === 0) {
              return `${transportTypeToIcon(currentSection.transport.mode)} arrow_forward door_sliding`;
            }

            switch (id) {
              case 0: return `arrow_forward ${transportTypeToIcon(currentSection.transport.mode)}`;
              case currentSection.intermediateStops.length - 1: return `arrow_forward door_sliding`;
              default: return `airline_seat_recline_normal`;
            }
          })()} />

          <gridLayout row={2} columns="*" rows="*,auto,*">

            <TrainProgressComponent row={2} transportIcon={transportTypeToIcon(currentSection.transport.mode)} transportName={currentSection.transport.name} stops={(() => {
              const stops = [];

              let currentId = $liveJourney.currentIntermediateStop;

              for (let index = currentId; index < currentSection.intermediateStops.length; index++) {
                let stop = currentSection.intermediateStops[index];
                stops.push(stop.departure.place.name)
              }

              stops.push(currentSection.arrival.place.name);

              return stops;
            })()}/>

          </gridLayout>
        {:else}

          <SupportBox row={0} text={currentSupportBoxText} type={$multiModality.primary === 'auditory' ? 'big' : 'small'} class="m-b-m" />

          <label text={transportTypeToIcon(currentSection.transport.mode)} class="icon text-center fs-3xl" row={1} on:tap={simulateNextStep} />

          <label text="Karte tbd. Ziel: {currentSection.arrival.place.name ?? currentSection.arrival.place.location.lat + '/' + currentSection.arrival.place.location.lng}" textWrap={true} row={2}  />

        {/if}


        <gridLayout row="3" columns="*, auto, *">
          <Button text="Gesamtübersicht anzeigen" icon="route" iconPosition="pre" type="secondary" column={1} on:tap={openRouteOverview} class="m-b-m {$multiModality.primary === 'auditory' ? 'fs-l' : ''}"/>
        </gridLayout>
        <gridLayout columns="*, *, *, *, *" rows="auto" row={4} class="m-b-m p-s bg-primary-light border-radius">
          <Button column={0} columnSpan={2} text="Pause" icon="motion_photos_paused" iconPosition="pre" on:tap={togglePause} />
          <Button column={2} icon="contacts" on:tap={openContacts} class="m-l-s"/>
          <Button column={3} icon="warning" class="m-l-s" />
          <Button column={4} icon={$multiModality.primary === 'auditory' ? 'volume_up' : 'volume_off'} class="m-l-s" on:tap={toggleAudio} />
        </gridLayout>

      {/if}


    </gridLayout>

    {/await}
  {/if}
</page>

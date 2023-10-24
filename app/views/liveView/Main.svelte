<script type="ts">
  import { showModal } from "svelte-native";
  import { tick } from "svelte";
  import { confirm, action } from "@nativescript/core/ui/dialogs";
  import {
    tabIndex,
    liveJourney,
    multiModality,
    currentLocation,
    watchLocation,
  } from "~/stores";
  import { routeApi } from "~/api";
  import { speak } from "~/shared/utils/tts";
  import { playSound } from "~/shared/utils/index";
  import { transportTypeToIcon } from "~/shared/utilites";
  import { getNextStep } from "~/shared/utils/liveSections";
  import { distance } from "~/shared/utils/location";

  import Contacts from "./Contacts.svelte";
  import RouteOverview from "./RouteOverview.svelte";
  import SupportBox from "~/shared/components/SupportBox.svelte";
  import Button from "~/shared/components/Button.svelte";
  import TrainProgressComponent from "~/shared/components/TrainProgressComponent.svelte";

  let intervalId: number;
  let isPaused = false;

  function onNavigatedTo() {
    watchLocation.start();

    intervalId = setInterval(async () => {
      if (isPaused) return;

      await calculateNewJourney;

      if (
        $liveJourney === null ||
        $liveJourney?.isPaused ||
        $liveJourney?.isCompleted ||
        currentSection === undefined ||
        currentSection === false ||
        nextReachableLocation === null
      ) {
        return;
      }

      const { lat: nextLat, lng: nextLng } = nextReachableLocation;
      const { latitude: currentLat, longitude: currentLng } =
        $currentLocation.data;

      const actionLength = currentSection?.actions?.length ?? -1;
      const isCurrentlyIteratingActions =
        actionLength > 0 &&
        $liveJourney.currentAction !== actionLength - 1;

      if (nextReachableLocation.timestamp.getTime() - Date.now() <= 0) {
        if (
          // TODO: check if iterating actions
          !isCurrentlyIteratingActions &&
          distance(
            { latitude: nextLat, longitude: nextLng },
            { latitude: currentLat, longitude: currentLng },
          ) > 20
        ) {
          const actions = [
            "Alles ist in Ordnung",
            "Route von hier aus neu berechnen",
          ];
          const destructiveActionsIndexes = [1];
          isPaused = true;

          action({
            title: "Bist du bereits an deinem Zwischenziel?",
            message:
              "Nach unserer Berechnung bist du noch nicht an deinem Zwischenziel angekommen. Wenn nicht erreichst du womöglich nicht deinen Anschluss. Wie möchtest du fortfahren?",
            actions,
            destructiveActionsIndexes,
          }).then((result) => {
            if (result === actions[0]) {
              skipToNextStep();
            } else {
              calculateNewJourney = recalculateJourney();
            }
            isPaused = false;
          });
        } else {
          skipToNextStep();
        }
      }
    }, 1000);
  }

  function onNavigatingFrom() {
    watchLocation.stop();
    clearInterval(intervalId);
  }

  $: currentSection = $liveJourney?.sections[$liveJourney.currentSection];

  let nextReachableLocation: null | {
    lat: number;
    lng: number;
    timestamp: Date;
  } = null;

  $: if ($liveJourney?.isPaused === false) {
    const {
      currentSection: currentSectionId,
      currentAction,
      currentIntermediateStop,
    } = $liveJourney;
    const { sections } = $liveJourney;

    const nextStep = getNextStep(
      {
        sectionId: currentSectionId,
        actionId: currentAction,
        intermediateStopId: currentIntermediateStop,
      },
      sections,
    );

    if (nextStep) {
      const nextSection = sections[nextStep.sectionId];
      const currentSection = sections[currentSectionId];
      const actions = (nextSection || undefined)?.actions;
      const intermediateStops = (nextSection || undefined)?.intermediateStops;

      if (currentSection) {
        const { arrival, departure } = currentSection;

        if (
          currentSectionId === nextStep.sectionId &&
          intermediateStops &&
          intermediateStops.length > 0
        ) {
          // if we have intermediate stops in the same section
          const { departure } = intermediateStops[nextStep.intermediateStopId];
          nextReachableLocation = {
            lat: departure.place.location.lat,
            lng: departure.place.location.lng,
            timestamp: new Date(departure.time),
          };
        } else if (
          currentSectionId === nextStep.sectionId &&
          actions &&
          actions.length > 0
        ) {
          // if we have actions in the same section
          let accDuration = 0;
          for (let i = 0; i <= nextStep.actionId; i++) {
            accDuration += actions[i].duration;
          }
          nextReachableLocation = {
            lat: arrival.place.location.lat,
            lng: arrival.place.location.lng,
            timestamp: new Date(departure.time + accDuration),
          };
        } else {
          // if we have no actions and no intermediate stops or are already at the next section use the arrival time
          nextReachableLocation = {
            lat: arrival.place.location.lat,
            lng: arrival.place.location.lng,
            timestamp: new Date(arrival.time),
          };
        }
      }
    }
  }

  async function skipToNextStep() {
    if ($liveJourney === null) return;

    try {
      const nextSteps = getNextStep(
        {
          sectionId: $liveJourney.currentSection,
          actionId: $liveJourney.currentAction,
          intermediateStopId: $liveJourney.currentIntermediateStop,
        },
        $liveJourney?.sections,
      );

      if (nextSteps === null) {
        $liveJourney.isCompleted = true;
        return;
      }

      $liveJourney.currentSection = nextSteps.sectionId;
      $liveJourney.currentAction = nextSteps.actionId;
      $liveJourney.currentIntermediateStop = nextSteps.intermediateStopId;

      if ($multiModality.primary === "auditory") {
        await tick();
        await playAction();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function playAction() {
    await playSound("passiveNotification");

    return speak(currentSupportBoxText);
  }

  function getActionIcon(action: string, direction?: string) {
    if (action === "depart") return "start";
    if (action === "arrive") return "flag";
    if (action === "continue") return "straight";
    if (action === "roundaboutExit" && direction === "right")
      return "roundabout_right";
    if (action === "roundaboutExit" && direction === "left")
      return "roundabout_left";
    if (action === "roundaboutEnter" && direction === "right")
      return "roundabout_right";
    if (action === "roundaboutEnter" && direction === "left")
      return "roundabout_left";
    if (action === "turn" && direction === "left") return "turn_left";
    if (action === "turn" && direction === "right") return "turn_right";
    console.log("action", action, direction);
    return "next_plan";
  }

  function openRouteOverview() {
    console.log("open route overview");
    showModal({
      page: RouteOverview as any,
    });
  }

  function openContacts() {
    showModal({
      page: Contacts as any,
    });
  }

  function toggleAudio() {
    if ($multiModality.primary === "auditory") {
      $multiModality.primary = "visual";
      return;
    }

    $multiModality.primary = "auditory";
    playAction();
  }

  // TODO: Check if next step is reachable
  let calculateNewJourney = new Promise((resolve) => {
    resolve(null);
  });

  async function togglePause() {
    if ($liveJourney === null) return;

    if (!$liveJourney.isPaused) {
      const confirmPause = await confirm({
        title: "Navigation pausieren",
        message: "Brauchst du eine Pause?",
        okButtonText: "Ja",
        cancelButtonText: "Route fortsetzen",
      });

      if (confirmPause) {
        // TODO: stop notification
        $liveJourney.isPaused = true;
        return;
      }
    }

    $liveJourney.isPaused = false;

    calculateNewJourney = recalculateJourney();
  }

  function recalculateJourney() {
    return new Promise((resolve) => {
      if ($liveJourney == null) {
        resolve(null);
        return;
      }

      routeApi
        .get({
          origin: {
            lat: $currentLocation.data.latitude,
            lng: $currentLocation.data.longitude,
          },
          destination: $liveJourney.arrival.location,
          departureTime: new Date(),
          alternatives: 1,
        })
        .then((nextOptions) => {
          if (!$liveJourney) {
            resolve(null);
            return;
          }

          $liveJourney = {
            ...$liveJourney,
            sections: [
              ...$liveJourney.sections.slice(
                0,
                $liveJourney.currentSection + 1,
              ),
              false,
              ...nextOptions[0].sections,
            ],
            currentSection: $liveJourney.currentSection + 2,
          };
          resolve(null);
        });
    });
  }

  let currentSupportBoxText = "";

  $: if ($liveJourney && currentSection) {
    if ($liveJourney.isPaused) {
      currentSupportBoxText =
        "Die Routenführung wurde gestoppt. Steige an der nächsten Haltestelle aus und mache eine Pause.";
    } else if ($liveJourney.isCompleted) {
      currentSupportBoxText = "Sehr gut du hast dein Ziel erreicht.";
    } else if (currentSection.actions && currentSection.actions.length > 0) {
      currentSupportBoxText =
        currentSection.actions[$liveJourney.currentAction].instruction;
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
      currentSupportBoxText = `Du musst von ${currentSection.departure.place.name} nach ${currentSection.arrival.place.name}`;
    }
  }
</script>

<page
  class="bg-default"
  on:navigatedTo={onNavigatedTo}
  on:navigatingFrom={onNavigatingFrom}
>
  <actionBar title="Begleitung" />

  {#if $liveJourney === null || currentSection === undefined || currentSection === false}
    <gridLayout rows="*, *, *" padding="20">
      <label
        text="route"
        class="icon fs-xxl"
        verticalAlignment="top"
        horizontalAlignment="center"
      />
      <label
        text="Du hast aktuell keine Navigation aktiviert. In dem Menü 'Planung' kannst du eine Route erstellen und die Navigation starten."
        textWrap="true"
        verticalAlignment="middle"
      />
      <button text="Route planen" verticalAlignment="bottom" />
    </gridLayout>
  {:else}
    {#await calculateNewJourney}
      <gridLayout row="*,*,*" columns="*" class="main-layout">
        <label
          text="route"
          class="icon fs-xxl"
          verticalAlignment="top"
          horizontalAlignment="center"
        />
        <label
          text="Deine Route wird berechnet..."
          textWrap={true}
          verticalAlignment="middle"
        />
      </gridLayout>
    {:then}
      <gridLayout
        columns="*"
        rows="auto, auto, *, auto, auto"
        class="main-layout"
      >
        {#if $liveJourney.isPaused}
          <SupportBox
            text={currentSupportBoxText +
              " " +
              nextReachableLocation?.lat +
              " " +
              nextReachableLocation?.lng}
            row={0}
            type={$multiModality.primary === "auditory" ? "big" : "small"}
            class="m-b-m"
          />

          <label
            text={"motion_photos_paused"}
            class="icon text-center {$multiModality.primary === 'auditory'
              ? 'fs-4xl'
              : 'fs-3xl'}"
            row={1}
          />

          <gridLayout row={3} columns="*, auto, *">
            <Button
              text="Gesamtübersicht anzeigen"
              icon="route"
              iconPosition="pre"
              type="secondary"
              column={1}
              on:tap={openRouteOverview}
              class="m-b-m {$multiModality.primary === 'auditory'
                ? 'fs-l'
                : ''}"
            />
          </gridLayout>

          <gridLayout
            columns="*, *, *, *, *"
            rows="auto"
            row={4}
            class="m-b-m p-s bg-primary-light border-radius"
          >
            <Button
              column={0}
              columnSpan={3}
              text="Pause vorbei"
              icon="check_circle_outline"
              iconPosition="pre"
              on:tap={togglePause}
            />
            <Button
              column={3}
              icon="contacts"
              on:tap={openContacts}
              class="m-l-s"
            />
            <Button
              column={4}
              icon={$multiModality.primary === "auditory"
                ? "volume_up"
                : "volume_off"}
              class="m-l-s"
              on:tap={toggleAudio}
            />
          </gridLayout>
        {:else if $liveJourney.isCompleted}
          <SupportBox
            row={0}
            text={currentSupportBoxText +
              " " +
              nextReachableLocation?.lat +
              " " +
              nextReachableLocation?.lng}
            type={$multiModality.primary === "auditory" ? "big" : "small"}
            class="m-b-m"
          />

          <label
            text="place"
            class="icon text-center fs-4xl"
            on:tap={skipToNextStep}
            row={1}
            rowSpan={2}
          />

          <gridLayout row="3" columns="*, auto, *" rowSpan={2}>
            <Button
              text="Zur Reisen-Übersicht"
              icon="travel_explore"
              iconPosition="pre"
              type="primary"
              column={1}
              on:tap={() => {
                $tabIndex = 0;
                $liveJourney = null;
              }}
              class="m-b-m {$multiModality.primary === 'auditory'
                ? 'fs-l'
                : ''}"
            />
          </gridLayout>
        {:else}
          {#if currentSection.actions && currentSection.actions.length > 0}
            <SupportBox
              row={0}
              text={currentSupportBoxText +
                " " +
                nextReachableLocation?.lat +
                " " +
                nextReachableLocation?.lng}
              type={$multiModality.primary === "auditory" ? "big" : "small"}
              class="m-b-m"
            />

            <label
              text={currentSection.actions
                ? getActionIcon(
                    currentSection.actions[$liveJourney.currentAction].action,
                    currentSection.actions[$liveJourney.currentAction]
                      .direction,
                  )
                : "warning"}
              class="icon text-center {$multiModality.primary === 'auditory'
                ? 'fs-4xl'
                : 'fs-3xl'}"
              on:tap={skipToNextStep}
              row={1}
            />

            <label
              text="Karte tbd. Zwischenziel: {currentSection.arrival.place
                .name ??
                currentSection.arrival.place.location.lat +
                  '/' +
                  currentSection.arrival.place.location.lng}"
              textWrap={true}
              row={2}
            />
          {:else if currentSection.intermediateStops}
            <SupportBox
              row={0}
              text={currentSupportBoxText +
                " " +
                nextReachableLocation?.lat +
                " " +
                nextReachableLocation?.lng}
              type={$multiModality.primary === "auditory" ? "big" : "small"}
              class="m-b-m"
            />

            <label
              class="icon text-center fs-3xl"
              on:tap={skipToNextStep}
              row={1}
              text={(() => {
                let id = $liveJourney.currentIntermediateStop;

                if (currentSection.intermediateStops.length === 0) {
                  return `${transportTypeToIcon(
                    currentSection.transport.mode,
                  )} arrow_forward door_sliding`;
                }

                switch (id) {
                  case 0:
                    return `arrow_forward ${transportTypeToIcon(
                      currentSection.transport.mode,
                    )}`;
                  case currentSection.intermediateStops.length - 1:
                    return `arrow_forward door_sliding`;
                  default:
                    return `airline_seat_recline_normal`;
                }
              })()}
            />

            <gridLayout row={2} columns="*" rows="*,auto,*">
              <TrainProgressComponent
                row={2}
                transportIcon={transportTypeToIcon(
                  currentSection.transport.mode,
                )}
                transportName={currentSection.transport.name}
                stops={(() => {
                  const stops = [];

                  let currentId = $liveJourney.currentIntermediateStop;

                  for (
                    let index = currentId;
                    index < currentSection.intermediateStops.length;
                    index++
                  ) {
                    let stop = currentSection.intermediateStops[index];
                    stops.push(stop.departure.place.name || "Unbekannt");
                  }

                  stops.push(currentSection.arrival.place.name || "Unbekannt");

                  return stops;
                })()}
              />
            </gridLayout>
          {:else}
            <SupportBox
              row={0}
              text={currentSupportBoxText +
                " " +
                nextReachableLocation?.lat +
                " " +
                nextReachableLocation?.lng}
              type={$multiModality.primary === "auditory" ? "big" : "small"}
              class="m-b-m"
            />

            <label
              text={transportTypeToIcon(currentSection.transport.mode)}
              class="icon text-center fs-3xl"
              row={1}
              on:tap={skipToNextStep}
            />

            <label
              text="Karte tbd. Ziel: {currentSection.arrival.place.name ??
                currentSection.arrival.place.location.lat +
                  '/' +
                  currentSection.arrival.place.location.lng}"
              textWrap={true}
              row={2}
            />
          {/if}

          <gridLayout row="3" columns="*, auto, *">
            <Button
              text="Gesamtübersicht anzeigen"
              icon="route"
              iconPosition="pre"
              type="secondary"
              column={1}
              on:tap={openRouteOverview}
              class="m-b-m {$multiModality.primary === 'auditory'
                ? 'fs-l'
                : ''}"
            />
          </gridLayout>
          <gridLayout
            columns="*, *, *, *, *"
            rows="auto"
            row={4}
            class="m-b-m p-s bg-primary-light border-radius"
          >
            <Button
              column={0}
              columnSpan={2}
              text="Pause"
              icon="motion_photos_paused"
              iconPosition="pre"
              on:tap={togglePause}
            />
            <Button
              column={2}
              icon="contacts"
              on:tap={openContacts}
              class="m-l-s"
            />
            <Button column={3} icon="warning" class="m-l-s" />
            <Button
              column={4}
              icon={$multiModality.primary === "auditory"
                ? "volume_up"
                : "volume_off"}
              class="m-l-s"
              on:tap={toggleAudio}
            />
          </gridLayout>
        {/if}
      </gridLayout>
    {/await}
  {/if}
</page>

<script type="ts">
  import { navigate } from "svelte-native";
  import { journeys } from "~/stores";
  import { liveJourney } from "~/stores/liveJourney";

  import Contacts from "./Contacts.svelte";
  import RouteOverview from "./RouteOverview.svelte";

  $liveJourney = {
    ...$journeys[0], // TODO: only on user interaction
    isPaused: false,
    currentStep: 0
  };

  function simulateNextStep() {
    if ($liveJourney === null) return;

    if ($liveJourney.currentStep >= $liveJourney.sections.length - 1) {
      $liveJourney.currentStep = 0;
      return;
    }

    $liveJourney.currentStep++;
  }

  function openRouteOverview() {
    navigate({
      page: RouteOverview as any
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

  {#if $liveJourney === null || currentSection === undefined}

  <stackLayout class="main-layout">
    <label text="route" class="icon fs-xxl" />
    <label text='Du hast aktuell keine Navigation aktiviert. In dem Menu "Route planen" kannst du eine Route erstellen und die Navigation starten.' textWrap={true} />
    <button text="Reise planen" />
  </stackLayout>

  {:else}

  <gridLayout columns="*" rows="auto, auto, *, auto, auto" class="main-layout">

    <label text="Zwischenziel: {currentSection.arrival.place.name ?? currentSection.arrival.place.location.lat + '/' + currentSection.arrival.place.location.lng} // Fortbewegung: {currentSection.transport.mode} // Ankunft: {new Date(currentSection.arrival.time).toLocaleTimeString()} " textWrap={true} row={0} class="bg-primary-light" />

    <label text="turn_left" class="icon fs-3xl" on:tap={simulateNextStep} row={1}  />

    <label text="Karte tbd." row={2}  />

    <button text="Gesamtübersicht anzeigen" row={3} on:tap={openRouteOverview} />
    <flexboxLayout class="bg-primary-light color-primary" row={4} >
      <button text="local_cafe" class="icon" />
      <button text="contacts" class="icon" />
      <button text="warning" class="icon" />
      <button text="volume_off" class="icon" />
    </flexboxLayout>
  </gridLayout>

  {/if}
</page>

<style>
</style>

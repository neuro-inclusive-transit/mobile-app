<script type="ts">
import { journeys } from "~/stores";

  $: currentLive = $journeys[0]; // TODO: get current live journey

  let sectionId = 0;

  function simulateNext() {
    if (sectionId >= currentLive.sections.length - 1) {
      sectionId = 0;
      return;
    }

    sectionId++;
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
  $: currentSection = currentLive.sections[sectionId];
</script>

<page class="bg-default">
  <actionBar title="Live-Ansicht" />

  {#if currentLive === null}

  <stackLayout class="main-layout">
    <label text="route" class="icon fs-xxl" />
    <label text='Du hast aktuell keine Navigation aktiviert. In dem Menu "Route planen" kannst du eine Route erstellen und die Navigation starten.' textWrap={true} />
    <button text="Reise planen" />
  </stackLayout>

  {:else}

  <gridLayout columns="*" rows="auto, auto, *, auto, auto" class="main-layout">

    <label text="Zwischenziel: {currentSection.arrival.place.name ?? currentSection.arrival.place.location.lat + '/' + currentSection.arrival.place.location.lng} // Fortbewegung: {currentSection.transport.mode} // Ankunft: {new Date(currentSection.arrival.time).toLocaleTimeString()} " textWrap={true} row={0} class="bg-primary-light" />

    <label text="turn_left" class="icon fs-3xl" on:tap={simulateNext} row={1}  />

    <label text="Karte tbd." row={2}  />

    <button text="Gesamtübersicht anzeigen" row={3} />
    <flexboxLayout class="bg-primary-light color-primary" row={4} >
      <button text="local_cafe" class="icon" width="40%" />
      <button text="contacts" class="icon" width="20%" />
      <button text="warning" class="icon" width="20%" />
      <button text="volume_off" class="icon" width="20%" />
    </flexboxLayout>
  </gridLayout>

  {/if}
</page>

<style>
</style>

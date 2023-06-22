<script type="ts">
  import { sizes } from "../sizes";

  export let departureTime = new Date();
  export let arrivalTime = new Date();
  export let crowdPercentage = 0.5;
  export let route: RouteSection[] = [];

  $: msInBetween = arrivalTime.getTime() - departureTime.getTime();
  $: duration = {
    hours: Math.floor(msInBetween / 1000 / 60 / 60),
    minutes: Math.floor((msInBetween / 1000 / 60) % 60)
  };

  function getDuration(duration: { hours: number; minutes: number }) {
    if (duration.hours === 0) {
      return duration.minutes + " Min.";
    }
    return duration.hours + " Std. " + duration.minutes + " Min.";
  }
  function getTime(date: Date) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  type RouteSection = {
    type: "walk" | "subway" | "train" | string;
    begin: Date;
    end: Date;
    transport_name?: string;
  };

  function getRouteSectionIcon(type: RouteSection['type']) {
    switch (type) {
      case "walk":
        return "directions_walk";
      case "bus":
        return "directions_bus";
      case "subway":
        return "directions_subway";
      case "train":
        return "directions_railway";
      default:
        return "directions_walk";
    }
  }
</script>

<gridLayout columns="*,auto,auto" rows="auto,auto" horizontalAlignment="center" class="route">
  <stackLayout col={0} row={0}>
    <label class="fw-bold" text={getDuration(duration)} />
    <label text="Aufbruch {getTime(departureTime)} Uhr" />
  </stackLayout>

  <label col={1} row={0} class="icon color-primary" text={
    (crowdPercentage > 0.3 ? "person" : "person_outline")
    + (crowdPercentage > 0.6 ? "person" : "person_outline")
    + (crowdPercentage > 0.9 ? "person" : "person_outline")
  } />

  <label col={2} row={0} class="icon fs-l" text="arrow_forward_ios" />

  <wrapLayout col={0} row={1} colSpan={3} horizontalAlignment="center" marginTop={sizes.s} class="steps">
    {#each route as section, i}
      <stackLayout class="steps__item" orientation="horizontal">
        <label class="icon color-primary" text={getRouteSectionIcon(section.type)} horizontalAlignment="center" />
        <label text={section.transport_name
        ? section.transport_name
        : getDuration({
          hours: Math.floor((section.end.getTime() - section.begin.getTime()) / 1000 / 60 / 60),
          minutes: Math.floor(((section.end.getTime() - section.begin.getTime()) / 1000 / 60) % 60)
        })} horizontalAlignment="center" paddingRight="8" />
      </stackLayout>

      {#if i < route.length - 1}
        <label class="icon steps__next" text="chevron_right" horizontalAlignment="center" />
      {/if}
    {/each}
  </wrapLayout>

</gridLayout>

<style>
  .route {
    margin: auto;
    padding: var(--xxs) var(--s);
    font-size: var(--s);
    border-color: var(--color-primary);
    border-width: 2;
    background: var(--color-background-light)
  }

  .steps__item {
    background: var(--color-primary-light);
    font-size: var(--xs);
    padding: calc(var(--xxs) / 2);
    border-radius: calc((var(--xxs) + var(--xs)));
  }

  .steps__item,
  .steps__next {
    margin-bottom: var(--xxs);
  }
</style>

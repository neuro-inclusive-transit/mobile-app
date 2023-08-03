<script type="ts">
  import { sizes } from "../sizes";

  import {transportTypeToIcon} from "~/shared/utilites";

  export let route: RouteSection[] = [];
  let cssClass = "";
  export { cssClass as class };


  function getDuration(duration: { hours: number; minutes: number }) {
    if (duration.hours === 0) {
      return duration.minutes + " Min.";
    }
    return duration.hours + " Std. " + duration.minutes + " Min.";
  }

  type RouteSection = {
    type: string;
    begin: Date;
    end: Date;
    transport_name?: string;
  };

</script>

<gridLayout columns="*,auto,auto" rows="auto,auto" horizontalAlignment="center" class="route {cssClass}">
    <slot name="maininfo"><label text="No content" /></slot>

    <slot name="crowdPercentage"></slot>

  <label col={2} row={0} class="icon fs-l" text="arrow_forward_ios" />

  <wrapLayout col={0} row={1} colSpan={3} horizontalAlignment="center" marginTop={sizes.s} class="steps">
    {#each route as section, i}
      <stackLayout class="steps__item" orientation="horizontal">
        <label class="icon color-primary" text={transportTypeToIcon(section.type)} horizontalAlignment="center" />
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
    padding: var(--xxs) var(--s);
    font-size: var(--s);
    border-color: var(--color-primary);
    border-width: 2;
    background: var(--color-background-light);
    width: 100%;
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

  .steps__item .icon {
    font-size: var(--xxs);
  }
</style>

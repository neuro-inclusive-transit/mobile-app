<script type="ts">
  import { localize as L } from '@nativescript/localize';
  import { Frame } from "@nativescript/core";
  import { goBack, navigate, closeModal } from "svelte-native";
  import type { BackNavigationOptions, NavigationOptions } from "svelte-native/dom";

  import { planJourney } from "~/stores";
  import Button from "~/shared/components/Button.svelte";
  import DepartureDestinationSwitcher from "~/shared/components/DepartureDestinationSwitcher.svelte";

  import { id as destinationId } from "./010_Destination.svelte";
  import { id as departureId } from "./021_Departure.svelte";

  export let id: string | undefined = undefined;

  export let showForwards = true;
  export let showBackwards = true;

  export let nextPage: any = undefined; // Type not compatible with SvelteComponent

  function closeBottomSheet() {
    planJourney.reset();
    closeModal(true);
  }

  export function navBackwards(
    toId?: string | undefined,
  ) {
    const toPage = toId ? Frame.topmost().backStack.find((entry) => entry.resolvedPage.id === toId) : undefined;

    try {
      if (toPage) {
        Frame.topmost().goBack(toPage);
        return;
      }
      goBack();
    } catch (e) {
      console.error(e);
    }
  }
  export function navForwards(
    page?: NavigationOptions['page'],
  ) {
    if (!nextPage && !page) {
      return;
    }
    navigate({
      page: page ? page : nextPage,
    });
  }

  function onSwitchValues() {
    let tmp = $planJourney.departure
    $planJourney.departure = $planJourney.arrival
    $planJourney.arrival = tmp
  }

  function onTapDeparture() {
    navBackwards(departureId)
  }

  function onTapDestination() {
    navBackwards(destinationId)
  }
</script>

<page actionBarHidden={true} class="bg-default" {id}>
  <gridLayout columns="*, auto, *" rows="auto, *, auto" class="p-t-m">

    <stackLayout row={0} columnSpan={3} class="main-layout">
      <button text={L('close')} on:tap="{closeBottomSheet}" class="link text-left m-b-xxs" />
      <slot name="header">
        <DepartureDestinationSwitcher departure="{$planJourney.departure?.name}" destination="{$planJourney.arrival?.name}" on:switchValues={onSwitchValues} on:tapDeparture={onTapDeparture} on:tapDestination={onTapDestination}/>
      </slot>
    </stackLayout>

    <scrollView columnSpan={3} row={1}>
      <slot></slot>
    </scrollView>

    <stackLayout orientation="horizontal" column={1} row={2} class="main-layout footer">
      <slot name="footer">
        {#if showBackwards}
        <Button text="Zurück" icon="chevron_left" on:tap="{() => navBackwards()}" iconPosition="pre" type="secondary" class="{ showForwards ? 'm-r-m' : '' }" />
        {/if}
        {#if showForwards}
        <Button text="Weiter" icon="chevron_right" on:tap="{() => navForwards()}" iconPosition="post" type="primary" />
        {/if}
      </slot>
    </stackLayout>
  </gridLayout>
</page>

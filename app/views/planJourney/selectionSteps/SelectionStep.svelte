<script type="ts">
  import { goBack, navigate, closeModal } from "svelte-native";
  import { localize as L } from '@nativescript/localize';

  import { planJourney } from "~/stores";
  import Button from "~/shared/components/Button.svelte";

  export let showForwards = true;
  export let showBackwards = true;

  export let nextPage: any = undefined; // Type not compatible with SvelteComponent

  function closeBottomSheet() {
    planJourney.reset();
    closeModal(true);
  }

  export function navBackwards() {
    goBack({
      frame: "planJourneySelection",
    });
  }
  export function navForwards() {
    if (!nextPage) {
      return;
    }
    navigate({
      page: nextPage,
      frame: "planJourneySelection",
    });
  }
</script>

<page actionBarHidden={true} class="bg-default">
  <gridLayout columns="*, auto, *" row="auto, *, auto">

    <stackLayout row={1} columnSpan={3} class="main-layout">
      <button text={L('close')} on:tap="{closeBottomSheet}" class="link t-a-l" />
      <slot name="header"></slot>
    </stackLayout>

    <scrollView columnSpan={3} class="main-layout">
      <slot></slot>
    </scrollView>

    <stackLayout orientation="horizontal" column={1} class="main-layout">
      <slot name="footer">
        {#if showBackwards}
        <Button text="Zurück" icon="chevron_left" on:tap="{navBackwards}" iconPosition="pre" type="secondary" />
        {/if}
        {#if showForwards}
        <Button text="Weiter" icon="chevron_right" on:tap="{navForwards}" iconPosition="post" type="primary" />
        {/if}
      </slot>
    </stackLayout>
  </gridLayout>
</page>

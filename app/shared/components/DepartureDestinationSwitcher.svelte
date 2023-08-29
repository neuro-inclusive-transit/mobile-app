<script lang="ts">
  import { sizes} from "~/shared/sizes";
  import Input from "./Input.svelte";
  import { createEventDispatcher } from "svelte";

  export let departure = "Abfahrt";
  export let destination = "Ziel";

  export let col: number | undefined = undefined;
  export let row: string | number | undefined = undefined;

  const dispatch = createEventDispatcher();
</script>

<gridLayout columns="auto, *, auto" rows="auto, {sizes.s}, auto" row={row} col={col}>
  <label text="von" row={0} col={0} class="fs-xs m-r-xxs" />
  <label text="nach" row={2} col={0} class="fs-xs m-r-xxs" />

  <Input text={departure} hint="Abfahrt" row={0} col={1} on:tap={() => {dispatch('tapDeparture')}} />
  <Input text={destination} hint="Ziel" row={2} col={1} on:tap={() => {dispatch('tapDestination')}} />

  <button text="swap_vert" class="icon fs-l" row={0} col={2} rowSpan={3} on:tap={() => {dispatch('switchValues')}} />
</gridLayout>

<style>
  button {
    color: var(--color-primary);
    padding: var(--s);
    margin-top: calc(var(--s) * -1);
    margin-right: calc(var(--s) * -1);
    margin-bottom: calc(var(--s) * -1);
    margin-left: var(--xxs);
  }
</style>

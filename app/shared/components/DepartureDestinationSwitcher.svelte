<script lang="ts">
  import { sizes } from "~/shared/sizes";
  import Input from "./Input.svelte";
  import { createEventDispatcher } from "svelte";

  export let departure = "Abfahrt";
  export let destination = "Ziel";

  export let col: number | undefined = undefined;
  export let row: string | number | undefined = undefined;

  const dispatch = createEventDispatcher();
</script>

<gridLayout columns="*, auto" rows="auto, auto" row={row} col={col}>
  <Input text={departure} hint="Abfahrt" row={0} col={0} marginBottom={sizes.xs} />
  <button text="swap_vert" class="icon" row={0} col={1} rowSpan={2} on:tap={() => {dispatch('switchValues', )}} />
  <Input text={destination} hint="Ziel" row={1} col={0} />
</gridLayout>

<style lang="css">
  button {
    color: var(--color-primary);
    margin-left: var(--xxs);
  }
</style>

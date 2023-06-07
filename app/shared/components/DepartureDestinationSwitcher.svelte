<script lang="ts">
  import Input from "./Input.svelte";

  export let departure = "Abfahrt";
  export let destination = "Ziel";

  function switchValues() {
    const temp = departure;
    departure = destination;
    destination = temp;
  }
</script>

<gridLayout columns="*, 40" rows="auto, auto">
  <Input pre="text" text={departure} hint="Abfahrt" row={0} col={0} />
  <button text="swap_vert" class="icon" row={0} col={1} rowSpan={2} on:tap={switchValues} />
  <Input pre="text" text={destination} hint="Ziel" row={1} col={0} />
</gridLayout>

<style lang="scss">
  button {
    color: var(--color-primary);
  }

  Input {
    margin-bottom: var(--base-xxs);
  }
</style>

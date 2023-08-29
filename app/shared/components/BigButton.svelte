<script type="ts">
  export let icon = "";
  $: hasIcon = icon !== "";
  export let label = "Default Label";

  export let selected = false;

  let customClass = "";
  export { customClass as class };
</script>

<gridLayout class="button {customClass}" class:selected>
  <stackLayout orientation="horizontal" on:tap>
    {#if hasIcon}
      <label class="icon button-icon" text={icon} />
    {/if}
    <label class="button-text" text={label} />
  </stackLayout>
</gridLayout>

<style lang="scss">
  .button {
    padding-left: calc(var(--base-s) * 24px);
    padding-right: var(--s);
    width: auto;
    height: 150px;
    border-color: var(--color-primary);
    border-width: 2pt;
    border-radius: calc(var(--base-s) * 5);
    background-color: var(--color-background-light);
    font-size: var(--m);
  }

  .button-icon {
    color: var(--color-primary);
    padding-right: calc(var(--base-s) * 8px);
  }

  .button-text {
    padding-left: calc(var(--base-s) * 16px);
  }

  .button.selected {
    background-color: var(--color-primary);
    color: var(--color-background-light);

    .button-icon {
      color: var(--color-background-light);
    }
  }
</style>

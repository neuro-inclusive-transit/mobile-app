<script type="ts">
  export let open = false;
  export let customClass = "";

  function toggle() {
    open = !open;
  }
</script>

<stackLayout class="wrapper {customClass}">
  <gridLayout columns="*,auto" rows="auto" on:tap={toggle}>
    <slot name="header" />
    <button
      text={open ? "expand_less" : "expand_more"}
      class="icon fs-m"
      row={0}
      col={1}
      on:tap={toggle}
    />
  </gridLayout>

  {#if open}
    <stackLayout class="content">
      <slot name="content">
        <label text="No content" />
      </slot>
    </stackLayout>
  {/if}
</stackLayout>

<style>
  .wrapper {
    background-color: var(--color-background-dark);
    border-radius: var(--border-radius);
    padding: var(--xs);
  }

  .content {
    margin-top: var(--xs);
  }

  button {
    padding: var(--s);
    margin: calc(var(--s) * -1);
  }
</style>

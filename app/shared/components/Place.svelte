<script type="ts">
  export let customIcon = "🏠";
  export let name = "default Ort";
  export let address = "Main Street 66, 12345 Cloud City";

  let customClass = "";
  export { customClass as class };
</script>

<gridLayout
  class="places {customClass}"
  columns="auto, *, auto"
  rows="auto,auto"
  on:tap
>
  <label
    text={customIcon}
    row={0}
    col={0}
    rowSpan={2}
    horizontalAlignment="center"
    class="m-r-s"
  />
  <label
    text={name}
    class="fw-bold"
    row={0}
    col={1}
    verticalAlignment="bottom"
  />
  <label
    text={address}
    row={1}
    col={1}
    verticalAlignment="top"
    textWrap={true}
  />
  <label
    class="icon m-l-s"
    text="arrow_forward_ios"
    row={0}
    col={2}
    rowSpan={2}
    horizontalAlignment="center"
  />
</gridLayout>

<style>
  .places {
    padding: var(--s) var(--m);
    border-color: var(--color-primary);
    border-width: 2;
    background: var(--color-background-light);
  }
</style>

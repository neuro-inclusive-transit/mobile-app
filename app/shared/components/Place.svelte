<script type="ts">
  export let customIcon = "🏠";
  export let name = "default Ort";
  export let address = "Main Street 66, 12345 Cloud City";
</script>

<gridLayout class="places" columns="*, 5*, *" rows="40,40">
  <label text={customIcon} row={0} col={0} rowSpan="2" horizontalAlignment="center"/>
  <label text={name} class="fw-bold" row={0} col={1} verticalAlignment="bottom" />
  <label text={address} row={1} col={1} verticalAlignment="top" />
  <label class="icon" text="arrow_forward_ios" row={0} col={2} rowSpan="2" horizontalAlignment="center" />
</gridLayout>

<style>
  .places {
    margin: auto;
    padding: auto;
    border-color: var(--color-primary);
    border-width: 2;
    background: var(--color-background-light)
  }
</style>

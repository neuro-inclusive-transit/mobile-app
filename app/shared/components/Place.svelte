<script type="ts">
  export let customIcon = "🏠";
  export let name = "default Ort";
  export let address = "Main Street 66, 12345 Cloud City";
</script>

<gridLayout class="places" columns="*, 5*, *" rows="40,40" marginTop="32">
  <label text={customIcon} row={0} col={0} rowSpan="2" horizontalAlignment="center"/>
  <label text={name} fontWeight="bold" row={0} col={1} verticalAlignment="bottom" /> <!-- TODO: fontWeight über css -->
  <label text={address} row={1} col={1} verticalAlignment="top" />

  <label class="icon" text="arrow_forward_ios" row={0} col={2} rowSpan="2" horizontalAlignment="center" />
</gridLayout>

<style>
  .places {
    margin: auto;
    padding: auto;
    font-size: 16px;
    border-color: #3b5bdb;
    border-width: 2;
    background: white;
  }

  .places .fas {
    color: blue;
  }
</style>

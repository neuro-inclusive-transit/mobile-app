<script type="ts">
  import { closeModal } from "svelte-native";

  import Button from "~/shared/components/Button.svelte";

  export let date = new Date();

  function closeBottomSheet() {
    closeModal(date);
  }
</script>

<frame id="datePicker" iosIgnoreSafeArea="true" class="ns-root">
  <page actionBarHidden={true} class="bg-default">
    <gridLayout columns="*" rows="auto, *, auto" class="main-layout">
      <label text="Tag der Reise auswählen..." textWrap={true} class="fs-l m-b-xxl" row={0} />

      <datePicker bind:date minDate={new Date()} row={1} iosPreferredDatePickerStyle="3" />

      <Button text="Tag bestätigen" on:tap="{closeBottomSheet}" row={2} class="m-t-m" />
    </gridLayout>
  </page>
</frame>

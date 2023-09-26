<script type="ts">
  import { closeModal } from "svelte-native";

  import Button from "~/shared/components/Button.svelte";

  function closeBottomSheet() {
    closeModal(true);
  }
</script>

<frame id="datePicker" iosIgnoreSafeArea="true" class="ns-root">
  <page actionBarHidden={true} class="bg-default">
    <gridLayout columns="*" rows="auto, auto, *, auto" class="main-layout">
      <label
        text="help"
        textWrap={true}
        class="fs-xl m-b-s text-center icon"
        row={0}
      />
      <label
        text="Was bedeutet die Navigationsbegleitung?"
        textWrap={true}
        class="fs-l m-b-xxl"
        row={1}
      />

      <scrollView row={2}>
        <stackLayout row={2} class="text" verticalAlignment="top">
          <label
            text="Damit du deine Reise gut durchführen kannst und dich nicht verfährst, werden wir dich an bestimmten Punkten deiner Reise benachrichtigen. Du kannst einstellen, wie häufig wir das tun sollen."
            textWrap={true}
            class="m-b-s"
          />

          <label textWrap={true} class="m-b-s">
            <formattedString>
              <span text="Bei " />
              <span text="Selten" fontWeight="bold" />
              <span
                text=" geben wir die nur in schwierigen und nicht zu erwartenden Situationen Hilfestellungen. Bei "
              />
              <span text="Gelegentlich" fontWeight="bold" />
              <span
                text=" benachrichtigen wir dich nur bei einem Wechsel des Transportmittels. Bei "
              />
              <span text="Oft" fontWeight="bold" />
              <span
                text=" bekommst du bei jeder Aktion einen Hinweis, damit du keine Weg verpasst, auch wenn dein Fokus auf externe Ereignisse gelenkt wird."
              />
            </formattedString>
          </label>

          <label
            text="Du kannst die Navigationsbegleitung jederzeit in den Einstellungen ändern."
            textWrap={true}
            class="m-b-s"
          />
        </stackLayout>
      </scrollView>

      <Button
        text="Schließen"
        type="ghost"
        on:tap={closeBottomSheet}
        row={3}
        class="m-t-m text-center"
      />
    </gridLayout>
  </page>
</frame>

<style>
  .text {
    font-size: var(--m);
    hyphens: auto;
  }
</style>

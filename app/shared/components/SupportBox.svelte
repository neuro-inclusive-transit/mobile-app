<script type="ts">
  import { speak } from "~/shared/utils/tts";

  export let text: string;
  export let tts: boolean = true;

  export let type: "big" | "small" = "small";

  function onButtonTap() {
    speak(text);
  }

  // grid layout props
  export let row: number | undefined = undefined;
  export let column: number | undefined = undefined;
  export let rowSpan: number | undefined = undefined;
  export let columnSpan: number | undefined = undefined;

  // class
  let cssClass: string | undefined = undefined;
  export { cssClass as class };
</script>

<gridLayout columns="*,auto" {row} {column} {rowSpan} {columnSpan} class={cssClass} on:tap>
  <label {text} class={type === "big" ? 'fs-xl' : 'fs-m'} textWrap="true"></label>
  {#if tts}
    <button column={1} verticalAlignment="bottom" text="volume_up" class="icon" on:tap={onButtonTap}></button>
  {/if}
</gridLayout>

<style>
  gridLayout {
    background-color: var(--color-primary-light);
    border-width: 1pt;
    border-color: var(--color-primary);
    border-radius: var(--border-radius);
    padding: var(--m)
  }

  button {
    padding: var(--m);
    margin: calc(var(--s) * -1);
    font-size: var(--m);
  }
</style>

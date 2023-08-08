<script type="ts">
  export let text: string;
  export let tts: boolean = true;

  function onButtonTap() {
    console.log("button tap");
    // TODO: add tts
  }

  // grid layout props
  export let row: number | undefined = undefined;
  export let column: number | undefined = undefined;
  export let rowSpan: number | undefined = undefined;
  export let columnSpan: number | undefined = undefined;
</script>

<gridLayout columns="*,auto" {row} {column} {rowSpan} {columnSpan}>
  <label {text} textWrap="true"></label>
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

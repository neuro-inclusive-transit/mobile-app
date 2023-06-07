<script type="ts">
  interface $$Props extends Partial<svelteNative.JSX.IntrinsicElements['textField']> {
    pre?: string;
    elevated?: boolean;
  }

  export let pre = 'search';
  export let elevated = false;

</script>

<gridLayout columns="auto,*" rows="auto" id="wrapper" class:elevated>
  <label text={pre} class="icon" row={0} col={0} />
  <textField row={0} col={1} {...$$props} />
</gridLayout>


<style type="scss">
  #wrapper {
    border-width: 1pt;
    border-color: var(--color-primary);
    font-size: var(--s);
    color: var(--color-foreground);
    background-color: var(--color-background-light);
    padding: 0 var(--xs);
  }

  textField {
    background-color: transparent;
    border-color: transparent;
    font-size: var(--s);
    padding: var(--xxs) 0;
    margin: 0;
    width: 100%;
  }
</style>

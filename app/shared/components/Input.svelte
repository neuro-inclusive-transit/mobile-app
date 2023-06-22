<script type="ts">
  interface $$Props extends Partial<svelteNative.JSX.IntrinsicElements['textField']> {
    pre?: string;
    elevated?: boolean;
  }

  export let pre = '';
  export let elevated = false;

  $: gridProps = {
    row: $$props['row'],
    col: $$props['col'],
    rowSpan: $$props['rowSpan'],
    colSpan: $$props['colSpan'],
    marginTop: $$props['marginTop'],
    marginBottom: $$props['marginBottom'],
    marginLeft: $$props['marginLeft'],
    marginRight: $$props['marginRight'],
    margin: $$props['margin'],
    padding: $$props['padding'],
    paddingTop: $$props['paddingTop'],
    paddingBottom: $$props['paddingBottom'],
    paddingLeft: $$props['paddingLeft'],
    paddingRight: $$props['paddingRight'],
  };

</script>

<gridLayout columns="auto,*" rows="auto" id="wrapper" class:elevated {...gridProps}>
  <label text={pre} class="icon" row={0} col={0}/>
  <textField {...$$restProps} row={0} col={1} margin={0} />
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
  }

  label {
    margin-right: var(--xxs);
  }

  .elevated {
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
  }
</style>

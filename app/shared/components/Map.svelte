<script type="ts">
  interface $$Props extends Partial<svelteNative.JSX.IntrinsicElements['htmlView']> {}

  const hereApiKey = process.env.HERE_API_KEY ?? '';
</script>

<webView src={"~/html/map.html?hereApiKey=" + hereApiKey} row={$$props['row']} />

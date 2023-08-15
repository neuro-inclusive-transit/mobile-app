<script type="ts">
  const hereApiKey: string = process.env.HERE_API_KEY ?? "";

  interface $$Props
    extends Partial<svelteNative.JSX.IntrinsicElements["htmlView"]> {
    currentLocation: { lat: number; lng: number } | null;
    startLocation: { lat: number; lng: number } | null;
    endLocation: { lat: number; lng: number } | null;
  }

  export let currentLocation: $$Props["currentLocation"] = null;
  export let startLocation: $$Props["startLocation"] = null;
  export let endLocation: $$Props["endLocation"] = null;

  let mapSearchParams = "";

  $: {
    const params = {
      hereApiKey: hereApiKey,
      currentLocation: currentLocation
        ? currentLocation.lat + "," + currentLocation.lng
        : "",
      startLocation: startLocation
        ? startLocation.lat + "," + startLocation.lng
        : "",
      endLocation: endLocation ? endLocation.lat + "," + endLocation.lng : "",
    };

    const keys = Object.keys(params) as (keyof typeof params)[];

    mapSearchParams = keys
      .map((key) => key + "=" + params[key])
      .join("&");

    console.log(mapSearchParams);
  }
</script>

<!-- <label text="{mapSearchParams.toString()}" /> -->

<webView src={"~/html/map.html?" + mapSearchParams} row={$$props['row']} />

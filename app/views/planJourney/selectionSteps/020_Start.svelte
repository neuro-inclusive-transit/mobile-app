<script type="ts" context="module">
  export const id = "selectionStep_Start";
</script>

<script type="ts">
  import { CoreTypes } from "@nativescript/core";
  import * as geolocation from "@nativescript/geolocation";

  import SelectionStep from "./SelectionStep.svelte";
  import Departure from "./021_Departure.svelte";
  import JourneyPreferences from "./040_JourneyPreferences.svelte";

  import { planJourney, Place as StorePlace } from "~/stores";

  import Button from "~/shared/components/Button.svelte";

  let wrapper: SelectionStep;

  async function getCurrentLocation() {
    await geolocation.enableLocationRequest();

    const currentLocation = await geolocation.getCurrentLocation({
      desiredAccuracy: CoreTypes.Accuracy.high,
      maximumAge: 40,
      timeout: 20000,
    });

    // TODO: convert to address

    return {
      name: "Aktueller Standort",
      location: {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      },
      icon: "📍",
      currentLocation: true,
    };
  }

  function onStartNow() {
    $planJourney.time.value = new Date();

    getCurrentLocation()
      .then((place) => {
        $planJourney.departure = place;
        wrapper.navForwards(JourneyPreferences as any);
      })
      .catch((err) => {
        wrapper.navForwards();
      });
  }

  function onStartLater() {
    wrapper.navForwards();
  }

  function formatAddress(address: StorePlace["address"]) {
    if (!address) return "";

    return `${address.street}, ${address.postcode} ${address.city}`;
  }
</script>

<SelectionStep
  nextPage={Departure}
  bind:this={wrapper}
  showForwards={false}
  {id}
>
  <label
    slot="header"
    text="Deine Reise nach {$planJourney.arrival?.name ??
      formatAddress($planJourney.arrival?.address)}"
    textWrap={true}
    class="fs-l fw-bold"
  />

  <stackLayout class="main-layout">
    <label
      text={formatAddress($planJourney.arrival?.address)}
      textWrap={true}
      class="fs-s m-b-xxl"
    />

    <gridLayout columns="*, auto, *" rows="auto, auto">
      <Button
        text="Jetzt Reise beginnen"
        icon="navigation"
        on:tap={onStartNow}
        class="m-b-m"
        column={1}
        row={0}
      />
      <Button
        text="Für später planen"
        icon="calendar_month"
        type="secondary"
        on:tap={onStartLater}
        column={1}
        row={1}
      />
    </gridLayout>
  </stackLayout>
</SelectionStep>

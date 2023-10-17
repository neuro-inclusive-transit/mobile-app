<script type="ts" context="module">
  export const id = "selectionStep_RouteSelection";
</script>

<script type="ts">
  import SelectionStep from "./SelectionStep.svelte";
  import NotificationFrequency from "./050_NotificationFrequency.svelte";

  import { planJourney } from "~/stores";

  import { routeApi, HereApiRoute } from "~/api";

  import RouteOverviewCard from "~/shared/components/RouteOverviewCard.svelte";
  import { calcDurationBetween, printTime, getTime } from "~/shared/utils/time";

  let wrapper: SelectionStep;
  let numOfAlternatives = 3;
  let crowdPercentage = 0.5;

  function factoryOnSelect(route: HereApiRoute) {
    return () => {
      $planJourney.preferredRoute = route;
      wrapper.navForwards();
    };
  }

  function calculateOptions() {
    if ($planJourney.departure && $planJourney.arrival) {
      $planJourney.options = routeApi.get({
        origin: {
          lat: $planJourney.departure.location.lat,
          lng: $planJourney.departure.location.lng,
        },
        destination: {
          lat: $planJourney.arrival.location.lat,
          lng: $planJourney.arrival.location.lng,
        },
        departureTime: $planJourney.time.value,
        alternatives: numOfAlternatives,
      });
    }
  }

  function hereRouteSectionToGenericSection(
    sections: HereApiRoute["sections"],
  ) {
    return sections.map((section) => ({
      type: section.transport.mode,
      begin: new Date(section.departure.time),
      end: new Date(section.arrival.time),
      transport_name: section.transport.name,
    }));
  }
</script>

<SelectionStep
  nextPage={NotificationFrequency}
  on:navigatedTo={() => calculateOptions()}
  bind:this={wrapper}
  showForwards={false}
  showTime={true}
  {id}
>
  <stackLayout class="main-layout">
    <label
      text="Deine möglichen Routen"
      textWrap={true}
      class="fs-l fw-bold m-b-xl"
    />

    {#await $planJourney.options}
      <activityIndicator busy={true} />
    {:then routes}
      {#each routes as route}
        <RouteOverviewCard
          on:tap={factoryOnSelect(route)}
          class="m-b-m"
          route={hereRouteSectionToGenericSection(route.sections)}
        >
          <label
            col={1}
            row={0}
            class="icon color-primary"
            slot="crowdPercentage"
            text={(crowdPercentage > 0.3 ? "person" : "person_outline") +
              (crowdPercentage > 0.6 ? "person" : "person_outline") +
              (crowdPercentage > 0.9 ? "person" : "person_outline")}
          />
          <stackLayout col={0} row={0} slot="maininfo">
            <label
              text={printTime(
                calcDurationBetween(
                  new Date(route.sections[0].departure.time),
                  new Date(
                    route.sections[route.sections.length - 1].departure.time,
                  ),
                ),
              )}
            />
            <label
              text="Aufbruch {getTime(
                new Date(route.sections[0].departure.time),
              )} Uhr"
            />
          </stackLayout>
        </RouteOverviewCard>
      {/each}

      <button
        text="Weitere Optionen"
        class="link m-t-s"
        on:tap={() => {
          numOfAlternatives += 3;
          calculateOptions();
        }}
      />
    {:catch error}
      <label style="color: red">{error}</label>
    {/await}
  </stackLayout>
</SelectionStep>

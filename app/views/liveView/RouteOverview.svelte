<script type="ts">
  import { closeModal } from "svelte-native";
  import { liveJourney } from "~/stores";
  import { dateToTime, transportTypeToIcon } from "~/shared/utilites";
  import { localize as L } from "@nativescript/localize";

  import Accordion from "~/shared/components/Accordion.svelte";
</script>

<frame iosIgnoreSafeArea="true" class="ns-root">
  <page class="bg-light">
    <gridLayout rows="auto,auto,*" columns="*" class="main-layout">
      <button text={L("close")} on:tap={closeModal} class="link" />

      <label class="fs-l m-b-l" text="Routenübersicht" row={1} col={0} />

      {#if $liveJourney !== null}
        <scrollView row={2} col={0}>
          <stackLayout>
            {#each $liveJourney.sections as section, i}
              {#if section === false}
                <gridLayout rows="auto" columns="auto, *" class="m-b-s">
                  <label
                    text="local_cafe"
                    class="icon m-r-xxs fs-m"
                    row={0}
                    col={0}
                  />
                  <label
                    text="Du hast deine Reise pausiert."
                    class="fw-italic fs-s"
                    row={0}
                    col={1}
                  />
                </gridLayout>
              {:else}
                <Accordion
                  customClass="m-b-s"
                  open={$liveJourney.currentSection === i}
                >
                  <gridLayout
                    rows="auto, auto"
                    columns="auto, *, auto, *, auto"
                    slot="header"
                  >
                    <label
                      text={transportTypeToIcon(section.transport.mode)}
                      class="icon m-r-xxs fs-m"
                      row={0}
                      col={0}
                    />

                    <label
                      text={section.departure.place.name ?? "Startpunkt"}
                      row={0}
                      col={1}
                      class="fs-s"
                      textWrap={true}
                    />
                    <label
                      text="{dateToTime(new Date(section.departure.time))} Uhr"
                      row={1}
                      col={1}
                      class="fs-xs"
                    />

                    <label
                      text="chevron_right"
                      class="icon m-l-xxs m-r-xxs fs-m"
                      row={0}
                      col={2}
                    />

                    <label
                      text={section.arrival.place.name ?? "Zielpunkt"}
                      row={0}
                      col={3}
                      class="fs-s"
                      textWrap={true}
                    />
                    <label
                      text="{dateToTime(new Date(section.arrival.time))} Uhr"
                      row={1}
                      col={3}
                      class="fs-xs"
                    />
                  </gridLayout>

                  <stackLayout slot="content">
                    <label text="Test Content" />
                  </stackLayout>
                </Accordion>
              {/if}
            {/each}
          </stackLayout>
        </scrollView>
      {:else}
        <stackLayout row={1} col={0}>
          <label
            text="Du hast aktuell keine Navigation aktiviert. In dem Menu 'Route planen' kannst du eine Route erstellen und die Navigation starten."
            textWrap={true}
          />
          <button text="Reise planen" />
        </stackLayout>
      {/if}
    </gridLayout>
  </page>
</frame>

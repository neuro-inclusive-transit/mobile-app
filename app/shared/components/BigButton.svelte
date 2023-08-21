<script type="ts" context="module">

export function generateIcon(preferredJourneyMode:string){
  if(preferredJourneyMode === "fastest") return "north"
  if(preferredJourneyMode === "least-changes") return "switch_access_shortcut_add"
  if(preferredJourneyMode === "least-walking") return "directions_walk"

  return ""
}

</script>

<script type="ts">

  import { createEventDispatcher } from "svelte";
  import { PreferredJourneyMode } from "~/types";

  export let icon = ""
  $: hasIcon = icon !== ""
  export let label = "Default Label";

</script>
<gridLayout class="button-style">
    <stackLayout orientation="horizontal" on:tap>
      <label class={hasIcon
        ? "icon button-withIcon"
        : "button-withoutIcon" } text="{icon}"/>
      <label class="button-text" text="{label}"/>
    </stackLayout>
</gridLayout>


  <style>
      .button-style {
          margin: auto;
          padding-left: calc(var(--base-s)*24px);
          padding-right: var(--s);
          width: auto;
          height: 150px;
          border-color: var(--color-primary);
          border-width: var(--base-s);
          border-radius: calc(var(--base-s)*5);
          background-color: var(--color-background-light);
          font-size: var(--m);
      }

      .button-withIcon {
          color: var(--color-primary);
          padding-right: calc(var(--base-s)*8px);
      }

      .button-withoutIcon {
          visibility: hidden;
      }

      .button-text {
        padding-left: calc(var(--base-s)*16px);
      }
  </style>






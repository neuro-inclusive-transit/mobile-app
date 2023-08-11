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

  export let icon = "";
  export let label = "Default Label";

</script>
<gridLayout class="button-style">
    <stackLayout orientation="horizontal" on:tap>
      <label class="button-icon icon" text="{icon}"/>
      <label class="button-text" text="{label}"/>
    </stackLayout>
</gridLayout>


  <style>
      .button-style {
          margin: auto;
          padding-left: var(--s);
          padding-right: var(--s);
          width: auto;
          height: 150px;
          border-color: var(--color-primary);
          border-width: var(--base-s);
          border-radius: calc(var(--base-s)*5);
          background-color: var(--color-background-light);
          font-size: var(--m);
      }

      .button-text {
          padding-left: 24px;
      }

      .button-icon {
          color: var(--color-primary);
      }
  </style>






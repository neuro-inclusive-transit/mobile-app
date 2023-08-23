<script type="ts">

  import { createEventDispatcher } from "svelte";
  import { PreferredJourneyMode } from "~/types";

  export let icon = ""
  $: hasIcon = icon !== ""
  export let label = "Default Label";

</script>
<gridLayout class="button-style">
    <stackLayout orientation="horizontal" on:tap>
      {#if hasIcon}
      <label class="icon button-icon" text="{icon}"/>
      {/if}
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

      .button-icon {
          color: var(--color-primary);
          padding-right: calc(var(--base-s)*8px);
      }

      .button-text {
        padding-left: calc(var(--base-s)*16px);
      }
  </style>






<script type="ts">

  import { createEventDispatcher } from "svelte";
  import { PreferredJourneyMode } from "~/types";

  export let icon = "⬆️";
  export let label = "Default Label";

</script>
     <!-- export let options: { icon: string, label: string, selected?: boolean }[] = []; /> -->

<gridLayout class="button-style" marginTop="27">
    <label text={icon} marginLeft=20px  horizontalAlignment="left" verticalAlignment="middle"/>
    <label text={label} fontSize=14px  marginLeft=120px verticalAlignment="middle" />
  </gridLayout>
 
  
  <style>
      .button-style {
          margin: auto;
          padding-left: auto;
          padding-right:auto;
          width: 800px;
          height: 150px;
          border-color:blue;
          border-width: 1px;
          background-color: white;
          font-size: 20px;
      }
  </style>

  




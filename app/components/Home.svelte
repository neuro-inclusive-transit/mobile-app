<script lang="ts">
  import Button from "@/components/shared/Button.svelte";

  let message: string = "Blank Svelte Native App";
</script>

<page>
  <actionBar title="Home" />
  <stackLayout>
    <label class="info">
      <formattedString>
        <span class="fas" text="&#xf135;" />
        <span text=" {message}" />
      </formattedString>
    </label>

    <Button>Hier Klicken</Button>
  </stackLayout>
</page>

<style>
  .info .fas {
    color: #3a53ff;
  }

    .info {
      font-size: 20;
      font-family: 'Atkinson Hyperlegible', 'Atkinson-Hyperlegible-Bold-102';
      horizontal-align: center;
      vertical-align: center;
    }
    actionBar{
        background: #3B5BDB;
        color: white;
        font-family: 'Atkinson Hyperlegible', 'Atkinson-Hyperlegible-Bold-102';
        font-size: 30;

    }
  </style>

<script lang="ts">
  import Button from "@/components/shared/Button.svelte";
  import Search from "@/components/shared/input.svelte";
  import Place from "@/components/shared/places.svelte";
  import Route from "./shared/Route.svelte";
  import BottmNavigation from "./shared/BottmNavigation.svelte";

    import { StackLayout } from "@nativescript/core";

  let message: string = "Blank Svelte Native App";
</script>

<page>
  <actionBar title="Home" />

  <stackLayout>
    <stackLayout>
      <label class="info">
        <formattedString>
          <span class="fas" text="&#xf035;" />
          <span text=" {message}" />
        </formattedString>
      </label>
    </stackLayout>

    <stackLayout>
      <Button type='secondary' icon='&#xf806' inhalt='rock on' />


    </stackLayout>

    <Place icon='🤟🏽' name='Rock Hall' address='Boulevard of broken dreams' />

    <Search hinweis='Gib ein Ziel ein...' icon='&#xf55f'/>

    <Button icon='&#xf124' inhalt='Jetzt Reise starten' />

    <Button type='line' inhalt='Abbrechen' />

    <Route start='Köln Zoo' destination='Gummersbach Bahnhof'/>

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

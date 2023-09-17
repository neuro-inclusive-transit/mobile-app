<script type="ts">
    export let customIcon = "🏠";
    export let icon = "";
    export let name = "default Ort";
    export let address = "Main Street 66, 12345 Cloud City";
  
    let customClass = "";
    export { customClass as class };
  </script>


<!-- mehr als 3 Haltestellen -->

<gridLayout columns="*,auto,*,auto,*,*,*,auto,*,auto,*" rows="auto,auto,auto" on:tap>
  <label col={0} row={1} class="icon fs-l" text="train" />
  <label col={0} row={2} colSpan={3} text="RB25" />
  <label col={1} row={1} class="icon fs-l" text="arrow_right" />
  <label col={1} row={0} colSpan={3} text="Haltestelle" />
  <stackLayout col={2} row={1} class="steps__item" orientation="horizontal">
    <label class="icon color-primary" text="place" horizontalAlignment="center"/>
  </stackLayout>
  <label col={3} row={1} class="icon fs-l" text="arrow_right" />

  <stackLayout col={4} row={1} colSpan={3} class="steps__stop" orientation="horizontal">
    <label text="3 Stops" horizontalAlignment="center" />
  </stackLayout>
  
  <label col={7} row={1} class="icon fs-l" text="arrow_right" />
  
  <label col={7} row={0} colSpan={3} text="Haltestelle" />
  <stackLayout col={8} row={1} class="steps__stop" orientation="horizontal">
    <label class="icon" text="place" horizontalAlignment="center"/>
  </stackLayout>

  <label col={9} row={1} class="icon fs-l" text="arrow_right" />
  <label col={10} row={1} class="icon fs-l" text="flag" />
  <label col={9} row={3} colSpan={3} text="Gummersbach" />
</gridLayout> 

<!-- noch 2 Haltestellen -->

<gridLayout columns="*,auto,*,*,*,auto,*,*,*,auto,*" rows="auto,auto,auto" on:tap>
  <label col={0} row={1} class="icon fs-l" text="train" />
  <label col={0} row={2} colSpan={3} text="RB25" />
  <label col={1} row={1} class="icon fs-l" text="arrow_right" />

  <stackLayout col={2} row={1} colSpan={3} class="steps__item" orientation="horizontal">
    <label class="icon color-primary" text="place" horizontalAlignment="center"/>
    <label text="Honrath" horizontalAlignment="center"/>
  </stackLayout>
  <label col={5} row={1} class="icon fs-l" text="arrow_right" />

  <stackLayout col={6} row={1} colSpan={3} class="steps__stop" orientation="horizontal">
    <label class="icon" text="place" horizontalAlignment="center"/>
    <label text="Dieringhausen" horizontalAlignment="center" />
  </stackLayout>
  
  <label col={9} row={1} class="icon fs-l" text="arrow_right" />

  <label col={10} row={1} class="icon fs-l" text="flag" />
  <label col={9} row={3} colSpan={3} text="Gummersbach" />
</gridLayout> 
  

<!--noch 1 Haltestellen -->

<gridLayout columns="auto,auto,*,auto,*" rows="auto,auto,auto" on:tap>
  <label col={0} row={1} class="icon fs-l" text="train" />
  <label col={0} row={2} colSpan={3} text="RB25" />
  <label col={1} row={1} class="icon fs-l" text="arrow_right" />

  <stackLayout col={2} row={1} class="steps__item" orientation="horizontal">
    <label class="icon color-primary" text="place" horizontalAlignment="center"/>
    <label text="Dierighausen" horizontalAlignment="center"/>
  </stackLayout>
  <label col={3} row={1} class="icon fs-l" text="arrow_right" />

  <label col={4} row={1} class="icon fs-l" text="flag" />
  <label col={4} row={3} text="Gummersbach" />
</gridLayout>


<style>
.route {
  padding: var(--xxs) var(--s);
  font-size: var(--s);
  border-color: var(--color-primary);
  border-width: 2;
  background: var(--color-background-light);
  width: 100%;
}

.steps__item {
  background: var(--color-primary-light);
  font-size: var(--s);
  padding: calc(var(--xxs) / 2);
  border-radius: calc((var(--xxs) + var(--xs)));
}

.steps__next {
  margin-bottom: var(--xxs);
}

.steps__item .icon {
  font-size: var(--s);
}

.steps__stop{
  font-size: var(--s);
  padding: calc(var(--xxs) / 2);
  border-radius: calc((var(--xxs) + var(--xs)));
  border-width: 1;
  border-color: var(--color-foreground);
}
</style>

  
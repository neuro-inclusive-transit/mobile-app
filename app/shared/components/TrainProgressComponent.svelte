<script type="ts">


  export let transportIcon = "train";
  export let transportName = "RB25";

  export let stops: string[] = [
    "Honrath",
    "ABC",
    "DEF",
    "GHI",
    "Dieringhausen",
    "Gummersbach",
  ];

  // css class
  let customClass = "";
  export { customClass as class };

  // grid layout props
  export let row: number | undefined = undefined;
  export let column: number | undefined = undefined;
  export let rowSpan: number | undefined = undefined;
  export let columnSpan: number | undefined = undefined;


</script>

{#if stops.length > 3}

<gridLayout columns="*,auto,*,auto,*,*,*,auto,*,auto,*" rows="auto,auto,auto" on:tap {row} {column} {rowSpan} {columnSpan} class={customClass}>
  <label col={0} row={1} class="icon fs-l" text={transportIcon} />
  <label col={0} row={2} colSpan={3} text={transportName} />
  <label col={1} row={1} class="icon fs-l" text="arrow_right" />

  <label col={1} row={0} colSpan={3} text={stops[0]} />
  <stackLayout col={2} row={1} class="steps__item" orientation="horizontal">
    <label class="icon color-primary" text="place" horizontalAlignment="center"/>
  </stackLayout>

  <label col={3} row={1} class="icon fs-l" text="arrow_right" />

  <stackLayout col={4} row={1} colSpan={3} class="steps__stop" orientation="horizontal">
    <label text="{stops.length - 3} {stops.length - 3 > 1 ? "weitere" : "weiterer"}..." horizontalAlignment="center" />
  </stackLayout>

  <label col={7} row={1} class="icon fs-l" text="arrow_right" />

  <label col={7} row={0} colSpan={3} text={stops[stops.length - 2]} />
  <stackLayout col={8} row={1} class="steps__stop" orientation="horizontal">
    <label class="icon" text="place" horizontalAlignment="center"/>
  </stackLayout>

  <label col={9} row={1} class="icon fs-l" text="arrow_right" />

  <label col={10} row={1} class="icon fs-l" text="flag" />
  <label col={9} row={3} colSpan={3} text={stops[stops.length - 1]} />

</gridLayout>

{:else if stops.length === 3}

<gridLayout columns="*,auto,*,*,*,auto,*,*,*,auto,*" rows="auto,auto,auto" on:tap {row} {column} {rowSpan} {columnSpan} class={customClass}>
  <label col={0} row={1} class="icon fs-l" text={transportIcon} />
  <label col={0} row={2} colSpan={3} text={transportName} />
  <label col={1} row={1} class="icon fs-l" text="arrow_right" />

  <stackLayout col={2} row={1} colSpan={3} class="steps__item" orientation="horizontal">
    <label class="icon color-primary" text="place" horizontalAlignment="center"/>
    <label text={stops[0]} horizontalAlignment="center"/>
  </stackLayout>

  <label col={5} row={1} class="icon fs-l" text="arrow_right" />

  <stackLayout col={6} row={1} colSpan={3} class="steps__stop" orientation="horizontal">
    <label class="icon" text="place" horizontalAlignment="center"/>
    <label text={stops[1]}  horizontalAlignment="center" />
  </stackLayout>

  <label col={9} row={1} class="icon fs-l" text="arrow_right" />

  <label col={10} row={1} class="icon fs-l" text="flag" />
  <label col={9} row={3} colSpan={3} text={stops[2]} />
</gridLayout>

{:else if stops.length === 2}

<gridLayout columns="auto,auto,*,auto,auto" rows="auto,auto,auto" on:tap {row} {column} {rowSpan} {columnSpan} class={customClass}>
  <label col={0} row={1} class="icon fs-l" text={transportIcon} />
  <label col={0} row={2} colSpan={3} text={transportName} />
  <label col={1} row={1} class="icon fs-l" text="arrow_right" />

  <stackLayout col={2} row={1} class="steps__item" orientation="horizontal">
    <label class="icon color-primary" text="place" horizontalAlignment="center"/>
    <label text={stops[0]} horizontalAlignment="center"/>
  </stackLayout>
  <label col={3} row={1} class="icon fs-l" text="arrow_right" />

  <label col={4} row={1} class="icon fs-l" text="flag" />
  <label col={4} row={3} text={stops[1]} />
</gridLayout>

{/if}

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


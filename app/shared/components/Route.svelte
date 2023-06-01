<script type="ts">
  export let start = "hier";
  export let destination = "da";
  export let departure = "Aufbruch 11:02";
  export let arrival = "Ankunft 14:15";
  export let reminder = "Erinnerung: 15 min";
</script>

<gridLayout columns="400" rows="auto" horizontalAlignment="center">
  <gridLayout
    class="route"
    columns="*, 80"
    rows="28, 28, 28, auto"
    marginTop="32"
    row="0"
  >
    <stackLayout orientation="horizontal" row="0">
      <label
        text={start}
        horizontalAlignment="center"
        paddingRight="12"
        fontWeight="bold"
      />
      <label
        class="icon"
        text="arrow_forward"
        color="#161616"
        horizontalAlignment="center"
        paddingRight="12"
      />
      <label
        text={destination}
        horizontalAlignment="center"
        paddingRight="12"
        fontWeight="bold"
      />
    </stackLayout>

    <stackLayout
      orientation="horizontal"
      col={2}
      row={0}
      horizontalAlignment="right"
    >
      <label class="icon" text="person" horizontalAlignment="center" />
      <label class="icon" text="person" horizontalAlignment="center" />
      <label class="icon" text="person_outline" horizontalAlignment="center" />
    </stackLayout>

    <stackLayout orientation="horizontal" row="1" colSpan="2">
      <label text={departure} horizontalAlignment="center" paddingRight="12" />
      <label text={arrival} horizontalAlignment="center" paddingRight="12" />
    </stackLayout>

    <stackLayout orientation="horizontal" row="2" colSpan="2">
      <label text={reminder} horizontalAlignment="center" paddingRight="12" />
    </stackLayout>

    <wrapLayout
      class="trains"
      row="3"
      colSpan="2"
      rowSpan="2"
      marginTop="8"
      marginBottom="-8"
    >
      <stackLayout
        class="routeStep"
        orientation="horizontal"
        col={0}
        marginBottom="12"
      >
        <label
          class="icon"
          text="directions_walk"
          horizontalAlignment="center"
          paddingRight="8"
          paddingLeft="8"
        />
        <label text="5 min" horizontalAlignment="center" paddingRight="8" />
      </stackLayout>

      <label
        class="icon"
        text="chevron_right"
        horizontalAlignment="center"
        col={2}
        padding="8"
        marginBottom="12"
      />

      <stackLayout
        class="routeStep"
        orientation="horizontal"
        col={3}
        marginBottom="12"
      >
        <label
          class="icon"
          text="directions_subway"
          horizontalAlignment="center"
          paddingRight="8"
          paddingLeft="8"
        />
        <label text="U 18" horizontalAlignment="center" paddingRight="8" />
      </stackLayout>

      <label
        class="icon"
        text="chevron_right"
        horizontalAlignment="center"
        col={4}
        padding="8"
        marginBottom="12"
      />

      <stackLayout
        class="routeStep"
        orientation="horizontal"
        col={5}
        marginBottom="12"
      >
        <label
          class="icon"
          text="train"
          horizontalAlignment="center"
          paddingRight="8"
          paddingLeft="8"
        />
        <label text="RB 25" horizontalAlignment="center" paddingRight="8" />
      </stackLayout>

      <label
        class="icon"
        text="chevron_right"
        horizontalAlignment="center"
        col={4}
        padding="8"
        marginBottom="12"
      />

      <stackLayout
        class="routeStep"
        orientation="horizontal"
        col={5}
        marginBottom="12"
      >
        <label
          class="icon"
          text="train"
          horizontalAlignment="center"
          paddingRight="8"
          paddingLeft="8"
        />
        <label text="RB 25" horizontalAlignment="center" paddingRight="8" />
      </stackLayout>
      <label
        class="icon"
        text="chevron_right"
        horizontalAlignment="center"
        col={4}
        padding="8"
        marginBottom="12"
      />

      <stackLayout
        class="routeStep"
        orientation="horizontal"
        col={5}
        marginBottom="12"
      >
        <label
          class="icon"
          text="train"
          horizontalAlignment="center"
          paddingRight="8"
          paddingLeft="8"
        />
        <label text="RB 25" horizontalAlignment="center" paddingRight="8" />
      </stackLayout>
    </wrapLayout>
  </gridLayout>
</gridLayout>

<style>
  .route {
    margin: auto;
    padding: 20;
    font-size: 16px;
    border-color: #3b5bdb;
    border-width: 2;
    background: white;
  }

  .routeStep {
    background: #dbe4ff;
    border-radius: 20;
    padding: 12;
    height: 40;
  }
</style>

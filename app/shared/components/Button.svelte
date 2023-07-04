<script type="ts">
  export let type = "primary";
  export let ButtonOrder = "Button";
  export let icon: string | undefined = undefined;
  export let content = "Neuer Knopf";


</script>

{#if ButtonOrder === 'XButton'}
    <button class={type} on:tap>
      <formattedString>
        <span class="icon" text={icon} />
        <span text="  " />
        <span text={content} />
      </formattedString>
    </button>

{:else if ButtonOrder === "ButtonX"}
    <button class={type} on:tap>
      <formattedString>
        <span text={content} />
        <span text="  " />
        <span class="icon" text={icon} />
      </formattedString>
    </button>

{:else}
    <button class={type} on:tap>
      <formattedString>
        <span text={content} />
      </formattedString>
    </button>

{/if}

<!-- <button class={type} class:flat on:tap>
  <formattedString>
    <span class="icon" text={icon} />
    <span text="  " />
    <span text={inhalt} />
  </formattedString>
</button> -->

<style>
  button {
    border-radius: 100%;
    margin-top: 32;
    padding: 40px;
    font-size: 20;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
    height: 40;
    width: 400;
  }

  .primary {
    background-color: #3b5bdb;
    color: white;
  }

  .primary .fas {
    color: white;
  }

  .secondary {
    background-color: white;
    color: #3b5bdb;
    border-width: 2;
    border-color: #3b5bdb;
  }

  .secondary .fas {
    color: #3b5bdb;
  }

  .line {
    background: #f2f4f8;
    text-decoration: underline;
    color: #3b5bdb;
    box-shadow: none;
  }
</style>

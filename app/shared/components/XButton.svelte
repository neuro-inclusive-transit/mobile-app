<script type="ts">
  export let type = "primary";
  export let flat = false;
  export let icon: string | undefined = undefined;
  export let contet = "Neuer Knopf";
</script>

<button class={type} class:flat>
  <formattedString>
    <span class="icon" text={icon} />
    <span text="  " />
    <span text={content} />
  </formattedString>
</button>

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

  .primary .icon {
    color: white;
  }

  .secondary {
    background-color: white;
    color: #3b5bdb;
    border-width: 2;
    border-color: #3b5bdb;
  }

  .secondary .icon {
    color: #3b5bdb;
  }
  .flat {
    box-shadow: none;
  }

  .line {
    background: #f2f4f8;
    text-decoration: underline;
    color: #3b5bdb;
    box-shadow: none;
  }
</style>

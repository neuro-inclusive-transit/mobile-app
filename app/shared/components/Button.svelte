<script type="ts">
  export let type: "primary" | "secondary" | "ghost" = "primary";

  export let iconPosition: "pre" | "post" = "post";
  export let icon: string | undefined = undefined;
  export let content: string | undefined = undefined;

  // grid layout props
  export let row: number | undefined = undefined;
  export let column: number | undefined = undefined;
  export let rowSpan: number | undefined = undefined;
  export let columnSpan: number | undefined = undefined;
</script>

<gridLayout columns="auto,*,auto" rows="auto" class="button {type} {icon ? "icon-" + iconPosition : ""}" on:tap {row} {column} {rowSpan} {columnSpan}>
  {#if icon && iconPosition === "pre"}
    <label class="icon" text={icon} verticalAlignment="middle" column={0} />
  {/if}

  {#if content}
    <label text={content} verticalAlignment="middle" column={1} />
  {:else}
    <slot />
  {/if}

  {#if icon && iconPosition === "post"}
    <label class="icon" text={icon} verticalAlignment="middle" column={2} />
  {/if}
</gridLayout>

<style type="scss">
  .button {
    border-radius: var(--m);
    padding: var(--xxs) var(--l);
    font-size: var(--s);
    box-shadow: var(--shadow-1);

    & > .icon {
      font-size: var(--m);
    }
  }

  .button.icon-pre {
    padding-left: var(--s);

    & > .icon {
      margin-right: var(--xxs);
    }
  }

  .button.icon-post {
    padding-right: var(--s);

    & > .icon {
      margin-left: var(--xxs);
    }
  }

  .primary {
    background-color: var(--color-primary);
    color: var(--color-primary-light);
  }

  .secondary {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    border-width: 2;
    border-color: var(--color-primary);
  }

  .ghost {
    background: transparent;
    text-decoration: underline;
    color: var(--color-primary);
    box-shadow: none;
  }
</style>

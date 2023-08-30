<script type="ts">
  export let type: "primary" | "secondary" | "ghost" = "primary";

  export let iconPosition: "pre" | "post" = "post";
  export let icon: string | undefined = undefined;
  export let text: string | undefined = undefined;

  // grid layout props
  export let row: number | undefined = undefined;
  export let column: number | undefined = undefined;
  export let rowSpan: number | undefined = undefined;
  export let columnSpan: number | undefined = undefined;

  // class
  let cssClass: string | undefined = undefined;
  export { cssClass as class };
</script>

<gridLayout columns="auto,*,auto" rows="auto" class="button {type} {icon ? "icon-" + iconPosition : ""} {text ? '' : 'just-icon'} {cssClass}" on:tap {row} {column} {rowSpan} {columnSpan}>
  {#if icon && iconPosition === "pre"}
    <label class="icon" text={icon} verticalAlignment="middle" column={0} />
  {/if}

  {#if text}
    <label class="text" text={text} verticalAlignment="middle" column={1} />
  {/if}

  {#if icon && iconPosition === "post"}
    <label class="icon" text={icon} verticalAlignment="middle" column={2} />
  {/if}
</gridLayout>

<style type="scss">
  .button {
    border-radius: var(--l);
    font-size: var(--s);
    box-shadow: var(--shadow-1);
    padding: var(--xxs) var(--l);
    font-weight: var(--fw-bold);
    border-width: 2;
    border-color: var(--color-primary);

    &.just-icon {
      padding: var(--xxs);
    }

    & > .icon {
      font-size: var(--m);
      text-align: center;
    }
  }

  .button.icon-pre {
    padding-left: var(--s);

    & > .text {
      margin-left: var(--xxs);
    }
  }

  .button.icon-post {
    padding-right: var(--s);

    & > .text {
      margin-right: var(--xxs);
    }
  }

  .primary {
    background-color: var(--color-primary);
    color: var(--color-background-light);
  }

  .secondary {
    background-color: var(--color-background);
    color: var(--color-primary);
  }

  .ghost {
    background: transparent;
    text-decoration: underline;
    color: var(--color-primary);
    box-shadow: none;
    background-color: transparent;
  }
</style>

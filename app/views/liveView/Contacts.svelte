<script type="ts">
  import { navigate } from "svelte-native";
  import { contacts } from "~/stores";
</script>

<page class="bg-light">
  <gridLayout rows="auto,*" columns="*" class="main-layout">
    <label class="fs-l m-b-l" text="Hilfe-Kontakte" row={0} col={0} />

    <scrollView row={1} col={0}>
      <stackLayout>
        {#each $contacts as contact}
          <gridLayout columns="auto, *" rows="auto, auto" class="m-b-s">
            <label
              text="account_circle"
              class="icon m-r-xxs fs-xl"
              row={0}
              col={0}
              rowSpan={2}
            />
            <label
              text="{contact.firstName} {contact.lastName}"
              row={0}
              col={1}
            />
            <label text={contact.phone} row={1} col={1} class="fs-s" />
          </gridLayout>
        {/each}
      </stackLayout>
    </scrollView>
  </gridLayout>
</page>

<style>
</style>

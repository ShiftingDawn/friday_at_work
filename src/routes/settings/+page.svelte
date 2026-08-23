<script lang="ts">
    import Button from "$comp/button.svelte";
    import Card from "$comp/card.svelte";
    import IconButton from "$comp/icon_button.svelte";
    import IconSettings from "$icon/settings.svelte";
    import FormCheckbox from "$comp/form_checkbox.svelte";
    import Section from "$comp/section.svelte";
    import {onMount} from "svelte";
    import type {ChangeEventHandler} from "svelte/elements";

    const {data,} = $props();

    onMount(() => {
      if ("showtimes" in localStorage) {
        const checkbox = document.querySelector("#showtimestampscheckbox") as HTMLInputElement;
        checkbox.checked = true;
      }
    });
    const onShowTimestampsCheckboxChanged: ChangeEventHandler<HTMLInputElement> = e => {
      if (e.currentTarget.checked) {
        localStorage.setItem("showtimes", "1");
      } else {
        localStorage.removeItem("showtimes");
      }
    };
</script>

<Card title="Preferences" class="max-w-md mx-auto">
  <Section class="flex flex-col gap-2">
    <FormCheckbox name="showtimestampscheckbox" id="showtimestampscheckbox" onchange={onShowTimestampsCheckboxChanged}>
      <strong>Show time next to dates</strong>
    </FormCheckbox>
    <p>
      Enable to show registration times for consumptions and restocks
    </p>
  </Section>
</Card>

<Card title="Account" class="max-w-md mx-auto mt-4">
  {#snippet action()}
    {#if data.isUserAdmin}
      <IconButton as="a" href="/account/admin">
        <IconSettings/>
      </IconButton>
    {/if}
  {/snippet}
  <div class="flex flex-col gap-4">
    <Button as="a" href="/settings/password">
      Change password
    </Button>
  </div>
</Card>

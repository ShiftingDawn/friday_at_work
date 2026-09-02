<script lang="ts">
    import Button from "$comp/button.svelte";
    import Card from "$comp/card.svelte";
    import FormCheckbox from "$comp/form_checkbox.svelte";
    import Section from "$comp/section.svelte";
    import {showTime, useOldBarStyle} from "$lib/preferences.js";
    import {onMount} from "svelte";
    import type {ChangeEventHandler} from "svelte/elements";
    import {get} from "svelte/store";

    onMount(() => {
      if (get(showTime)) {
        const checkbox = document.querySelector("#showtimestampscheckbox") as HTMLInputElement;
        checkbox.checked = true;
      }
      if (get(useOldBarStyle)) {
        const checkbox = document.querySelector("#useoldbarstylecheckbox") as HTMLInputElement;
        checkbox.checked = true;
      }
    });
    const onShowTimestampsCheckboxChanged: ChangeEventHandler<HTMLInputElement> = e => {
      showTime.set(e.currentTarget.checked);
    };
    const onUseOldBarStyleCheckboxChanged: ChangeEventHandler<HTMLInputElement> = e => {
      useOldBarStyle.set(e.currentTarget.checked);
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
  <Section class="flex flex-col gap-2">
    <FormCheckbox name="useoldbarstylecheckbox" id="useoldbarstylecheckbox" onchange={onUseOldBarStyleCheckboxChanged}>
      <strong>Use old bar chart style</strong>
    </FormCheckbox>
    <p>
      Enable to show old style bar charts on the scoreboard pages
    </p>
  </Section>
</Card>

<Card title="Account" class="max-w-md mx-auto mt-4">
  <div class="flex flex-col gap-4">
    <Button as="a" href="/settings/password">
      Change password
    </Button>
  </div>
</Card>

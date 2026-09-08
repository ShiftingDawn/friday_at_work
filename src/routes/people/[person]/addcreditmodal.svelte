<script lang="ts">
  import Button from "$comp/button.svelte";
  import Modal from "$comp/modal.svelte";
  import {flash} from "$lib/flash";
  import {addPersonCredit} from "$lib/functions/people.remote";
  import FormLabel from "$comp/form_label.svelte";
  import FormInput from "$comp/form_input.svelte";
  import type {PageData} from "./$types";

  const {person,}: { person: PageData["person"] } = $props();

  let open = $state(false);
  let creditFormLoading = $state(false);
</script>

<Modal as="form" {open} onclose={() => open = false} title="Edit person" {...addPersonCredit.enhance(async form => {
  creditFormLoading = true;
  try {
    const value = Math.round((form.fields.amount.value()! + Number.EPSILON) * 100) / 100;
    if (await form.submit()) {
      form.element.reset();
      flash("success", `Added ${value} credit for ${person!.name}`);
      open = false;
    } else {
      flash("error", `Could not add ${value} credit  for ${person!.name}`, "An unknown error occurred");
    }
  } catch {
    flash("error", `Could not add credit for ${person!.name}`);
  }
  creditFormLoading = false;
})}>
  <FormLabel name="Amount" error={addPersonCredit.fields.amount.issues()}>
    <FormInput {...addPersonCredit.fields.amount.as("number")} required min="0.01" step="0.01"
               disabled={creditFormLoading}/>
  </FormLabel>
  {#snippet actions()}
    <Button type="submit" loading={creditFormLoading}>
      Save
    </Button>
  {/snippet}
</Modal>

<Button onclick={() => open = true}>
  Add credit
</Button>

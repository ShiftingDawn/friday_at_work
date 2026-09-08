<script lang="ts">
  import Button from "$comp/button.svelte";
  import Modal from "$comp/modal.svelte";
  import {flash} from "$lib/flash";
  import {updatePerson} from "$lib/functions/people.remote";
  import FormLabel from "$comp/form_label.svelte";
  import FormInput from "$comp/form_input.svelte";
  import type {PageData} from "./$types";

  const {person,}: { person: PageData["person"] } = $props();

  let open = $state(false);
  let updateFormLoading = $state(false);
</script>

<Modal as="form" {open} onclose={() => open = false} title="Edit person" {...updatePerson.enhance(async form => {
  updateFormLoading = true;
  try {
    if (await form.submit()) {
      form.element.reset();
      flash("success", `Updated data for ${person!.name}`);
      open = false;
    } else {
      flash("error", `Could not update data for ${person!.name}`, "An unknown error occurred");
    }
  } catch {
    flash("error", `Could not update data for ${person!.name}`);
  }
  updateFormLoading = false;
})}>
  <FormLabel name="Name" error={updatePerson.fields.name.issues()}>
    <FormInput {...updatePerson.fields.name.as("text")} required min="3" disabled={updateFormLoading}/>
  </FormLabel>
  {#snippet actions()}
    <Button type="submit" loading={updateFormLoading}>
      Save
    </Button>
  {/snippet}
</Modal>

<Button onclick={() => open = true}>
  Edit data
</Button>

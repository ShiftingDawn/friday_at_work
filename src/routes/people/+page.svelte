<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import Modal from "$comp/modal.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import FormInput from "$comp/form_input.svelte";
  import Button from "$comp/button.svelte";
  import IconButton from "$comp/icon_button.svelte";
  import IconSubmit from "$icon/plus.svelte";
  import {createPerson} from "$lib/functions/people.remote";
  import {flash} from "$lib/flash";

  const {data,}: PageProps = $props();
  let modalOpen = $state(false);
  let newPersonFormLoading = $state(false);
</script>

{#if data.canWrite}
  <form {...createPerson.enhance(async form => {
    newPersonFormLoading = true;
    try {
      if (await form.submit()) {
        flash("success", "Person registered successfully");
      } else {
        flash("error", "Could not register person");
      }
    } catch {
      flash("error", "Could not register person", "An unknown error occurred");
    }
    newPersonFormLoading = false;
    modalOpen = false;
  })}>
    <Modal title="Register new person" open={modalOpen} onclose={() => modalOpen = false}
           canclose={!newPersonFormLoading}>
      <FormLabel name="Name" error={createPerson.fields.name.issues()}>
        <FormInput {...createPerson.fields.name.as("text")} required min="3" disabled={newPersonFormLoading}/>
      </FormLabel>
      {#snippet actions()}
        <Button type="submit" class="font-bold uppercase" loading={newPersonFormLoading}>
          Add
        </Button>
      {/snippet}
    </Modal>
  </form>
{/if}
<Card title="Manage people" class="mt-4">
  {#snippet action()}
    {#if data.canWrite}
      <IconButton onclick={() => modalOpen = true}>
        <IconSubmit/>
      </IconButton>
    {/if}
  {/snippet}
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each data.people as person(person.id)}
      <Button as="a" href={`/people/${person.id}`} class="w-full p-2 h-10">
        {person.name}
      </Button>
    {/each}
  </div>
</Card>

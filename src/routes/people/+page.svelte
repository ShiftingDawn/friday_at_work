<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$lib/components/card.svelte";
  import Modal from "$lib/components/modal.svelte";
  import FormLabel from "$lib/components/form_label.svelte";
  import FormInput from "$lib/components/form_input.svelte";
  import Button from "$lib/components/button.svelte";
  import IconButton from "$lib/components/icon_button.svelte";
  import IconSubmit from "$lib/icon/plus.svelte";
  import {enhance} from "$app/forms";

  const {data,}: PageProps = $props();
  let modalOpen = $state(false);
  let newPersonFormLoading = $state(false);
</script>

{#if data.canWrite}
    <form method="POST" use:enhance={() => {
      newPersonFormLoading = true;
      return async ({update,}) => {
        await update();
        newPersonFormLoading = false;
        modalOpen = false;
      };
    }}>
        <Modal title="Register new person" open={modalOpen} onclose={() => modalOpen = false}
               canclose={!newPersonFormLoading}>
            <FormLabel name="Name">
                <FormInput type="text" min="3" name="name" disabled={newPersonFormLoading}/>
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

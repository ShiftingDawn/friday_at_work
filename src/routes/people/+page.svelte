<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import Modal from "$lib/components/modal.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import Button from "$lib/components/button.svelte";
    import LinkButton from "$lib/components/link_button.svelte";
    import IconButton from "$lib/components/icon_button.svelte";
    import IconSubmit from "$lib/icon/plus.svelte";

    const {data}: PageProps = $props();
    let modalOpen = $state(false);
</script>

{#if data.canWrite}
    <form method="POST">
        <Modal title="Register new person" open={modalOpen} onclose={() => modalOpen = false}>
            <FormLabel name="Name">
                <FormInput type="text" min="3" name="name"/>
            </FormLabel>
            {#snippet actions()}
                <Button type="submit" class="font-bold uppercase">
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
        {#each data.people as person}
            <LinkButton href={`/people/${person.id}`} class="w-full p-2 h-10">
                {person.name}
            </LinkButton>
        {/each}
    </div>
</Card>
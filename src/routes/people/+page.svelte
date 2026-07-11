<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import Modal from "$lib/components/modal.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import FormButton from "$lib/components/form_button.svelte";
    import LinkButton from "$lib/components/link_button.svelte";
    import IconButton from "$lib/components/icon_button.svelte";
    import IconSubmit from "$lib/icon/plus.svelte";

    const {data}: PageProps = $props();
    let modalOpen = $state(false);
</script>

<form method="POST">
    <Modal title="Register new person" open={modalOpen} onclose={() => modalOpen = false}>
        <FormLabel name="Name">
            <FormInput type="text" min="3" name="name"/>
        </FormLabel>
        {#snippet actions()}
            <FormButton type="submit" class="font-bold uppercase">
                Add
            </FormButton>
        {/snippet}
    </Modal>
</form>
<Card title="Manage people" class="mt-4">
    {#snippet action()}
        <IconButton onclick={() => modalOpen = true}>
            <IconSubmit/>
        </IconButton>
    {/snippet}
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each data.people as person}
            <LinkButton href={`/people/${person.id}`} class="w-full p-2 h-10">
                {person.name}
            </LinkButton>
        {/each}
    </div>
</Card>
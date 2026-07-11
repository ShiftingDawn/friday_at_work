<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import FormButton from "$lib/components/form_button.svelte";
    import LinkButton from "$lib/components/link_button.svelte";

    const {data}: PageProps = $props();
</script>

<Card title="Register new person" as="form" method="POST" class="flex flex-col gap-4">
    <div class="flex gap-4">
        <FormLabel name="Name">
            <FormInput type="text" min="3" name="name"/>
        </FormLabel>
        <FormButton type="submit">
            Save
        </FormButton>
    </div>
</Card>
<Card title="View details" class="mt-4">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each data.people as person}
            <LinkButton href={`/people/${person.id}`} class="w-full p-2 h-10">
                {person.name}
            </LinkButton>
        {/each}
    </div>
</Card>
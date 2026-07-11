<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import FormButton from "$lib/components/form_button.svelte";
    import TableRow from "$lib/components/table_row.svelte";
    import TableHeadCell from "$lib/components/table_headcell.svelte";
    import TableCell from "$lib/components/table_cell.svelte";

    const {data}: PageProps = $props();
</script>

<Card as="form" method="POST" class="flex flex-col gap-4">
    {#snippet name()}
        Register new person
    {/snippet}
    <div class="flex gap-4">
        <FormLabel name="Name">
            <FormInput type="text" min="3" name="name"/>
        </FormLabel>
        <FormButton type="submit">
            Save
        </FormButton>
    </div>
</Card>
<Card class="mt-4">
    <table class="w-full">
        <thead>
        <TableRow>
            <TableHeadCell>Name</TableHeadCell>
        </TableRow>
        </thead>
        <tbody>
        {#each data.people as person}
            <TableRow>
                <TableCell>{person.name}</TableCell>
            </TableRow>
        {/each}
        </tbody>
    </table>
</Card>
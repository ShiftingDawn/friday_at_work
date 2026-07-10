<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import FormButton from "$lib/components/form_button.svelte";
    import TableRow from "$lib/components/table_row.svelte";
    import TableHeadCell from "$lib/components/table_headcell.svelte";
    import TableCell from "$lib/components/table_cell.svelte";
    import LinkButton from "$lib/components/link_button.svelte";

    const {data}: PageProps = $props();
</script>

<Card as="form" method="POST" class="flex flex-col gap-4">
    <span class="text-xl">Register new drink</span>
    <div class="flex gap-4">
        <FormLabel name="Name">
            <FormInput type="text" min="3" name="name"/>
        </FormLabel>
        <FormLabel name="Price">
            <FormInput type="number" min="0" name="price"/>
        </FormLabel>
        <FormButton type="submit">
            Save
        </FormButton>
    </div>
</Card>
<Card class="mt-4 px-0">
    <table class="w-full border-collapse">
        <thead>
        <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell></TableHeadCell>
        </TableRow>
        </thead>
        <tbody>
        {#each data.drinks as drink}
            <TableRow>
                <TableCell>{drink.name}</TableCell>
                <TableCell>{drink.price}</TableCell>
                <TableCell>
                    <LinkButton href={`/drinks/${drink.id}`}>
                        Edit
                    </LinkButton>
                </TableCell>
            </TableRow>
        {/each}
        </tbody>
    </table>
</Card>
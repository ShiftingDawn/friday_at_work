<script lang="ts">
    import type {PageProps} from "./$types";
    import {goto} from "$app/navigation";
    import Card from "$lib/components/card.svelte";
    import TableRow from "$lib/components/table_row.svelte";
    import TableHeadCell from "$lib/components/table_headcell.svelte";
    import TableCell from "$lib/components/table_cell.svelte";

    const {data}: PageProps = $props();
</script>

<Card>
    <table class="w-full">
        <thead>
        <TableRow>
            <TableHeadCell>Person</TableHeadCell>
            <TableHeadCell>Consumption</TableHeadCell>
        </TableRow>
        </thead>
        <tbody>
        {#each data.consumption as person}
            <TableRow onclick={() => goto(`/receipt/${person.id}`)}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person._count.consumptions}</TableCell>
            </TableRow>
        {/each}
        </tbody>
    </table>
</Card>
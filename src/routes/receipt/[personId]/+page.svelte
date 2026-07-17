<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import TableCell from "$lib/components/table_cell.svelte";
    import TableHeadCell from "$lib/components/table_headcell.svelte";
    import TableRow from "$lib/components/table_row.svelte";
    import {displayPrice} from "$lib";
    import IconButton from "$lib/components/icon_button.svelte";
    import BackButton from "$lib/components/back_button.svelte";
    import IconReset from "$lib/icon/reset.svelte";

    const {data}: PageProps = $props();
    const totalPrice = $derived(!data.consumptions?.length ? 0 : data.consumptions!.map(c => c.price * c.count).reduce((a, b) => a + b));
</script>

<Card title={data.person!.name} class="flex flex-col gap-4">
    {#snippet back()}
        <BackButton href="/receipt"/>
    {/snippet}
    {#snippet action()}
        <span class="text-ctp-blue font-bold text-xl mr-4">
            &euro;{displayPrice(totalPrice)}
        </span>
        {#if data.canWrite}
            <form method="POST">
                <IconButton type="submit">
                    <IconReset/>
                </IconButton>
            </form>
        {/if}
    {/snippet}
    <table class="w-full">
        <thead>
        <TableRow>
            <TableHeadCell>Drink</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>
        </TableRow>
        </thead>
        <tbody>
        {#each data.consumptions! as consumption}
            <TableRow>
                <TableCell>{consumption.drink!.name}</TableCell>
                <TableCell>&euro;{displayPrice(consumption.price)}</TableCell>
                <TableCell>{consumption.count}</TableCell>
                <TableCell>&euro;{displayPrice(consumption.price, consumption.count)}</TableCell>
            </TableRow>
        {/each}
        </tbody>
    </table>
</Card>
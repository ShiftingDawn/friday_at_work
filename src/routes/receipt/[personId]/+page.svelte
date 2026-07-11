<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import TableCell from "$lib/components/table_cell.svelte";
    import TableHeadCell from "$lib/components/table_headcell.svelte";
    import TableRow from "$lib/components/table_row.svelte";
    import {displayPrice} from "$lib";
    import FormButton from "$lib/components/form_button.svelte";

    const {data}: PageProps = $props();
    const totalPrice = $derived(data.consumptions!.map(c => c.drink!.price * c.count).reduce((a, b) => a + b));
</script>

<Card class="flex flex-col gap-4">
    <span class="text-xl">{data.person!.name}</span>
    <span>Total price: &euro;{displayPrice(totalPrice)}</span>
    <form method="POST">
        <FormButton type="submit">
            Reset
        </FormButton>
    </form>
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
                <TableCell>&euro;{displayPrice(consumption.drink!.price)}</TableCell>
                <TableCell>{consumption.count}</TableCell>
                <TableCell>&euro;{displayPrice(consumption.drink!.price, consumption.count)}</TableCell>
            </TableRow>
        {/each}
        </tbody>
    </table>
</Card>
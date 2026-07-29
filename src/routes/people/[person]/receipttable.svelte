<script lang="ts">
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import TableCell from "$comp/table_cell.svelte";
  import type {PageProps} from "./$types";
  import {displayPrice} from "$lib";
    import Table from "$comp/table.svelte";

  const {consumptions,}: {consumptions: PageProps["data"]["consumptions"];} = $props();
</script>

<Table>
  <thead>
  <TableRow>
    <TableHeadCell>Drink</TableHeadCell>
    <TableHeadCell>Price</TableHeadCell>
    <TableHeadCell>Amount</TableHeadCell>
    <TableHeadCell>Total</TableHeadCell>
  </TableRow>
  </thead>
  <tbody>
  {#each consumptions! as consumption(`${consumption.drink!.id}_${consumption.price}`)}
    <TableRow>
      <TableCell>{consumption.drink!.name}</TableCell>
      <TableCell>&euro;{displayPrice(consumption.price)}</TableCell>
      <TableCell>{consumption.count}</TableCell>
      <TableCell>&euro;{displayPrice(consumption.price, consumption.count)}</TableCell>
    </TableRow>
  {/each}
  </tbody>
</Table>

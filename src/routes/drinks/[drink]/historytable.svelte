<script lang="ts">
  import {displayPrice} from "$lib";
  import DateComponent from "$comp/date.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import TablePaginate from "$comp/table_paginate.svelte";
  import TableCell from "$comp/table_cell.svelte";
  import Table from "$comp/table.svelte";
  import TableRow from "$comp/table_row.svelte";
  import {onMount} from "svelte";
  import {getDrinkHistoryRecords} from "$lib/functions/drinks.remote";

  type Record = ({
    person: { name: string; };
    creator: { username: string; };
  } & {
    id: string;
    workspaceId: string;
    personId: string;
    drinkId: string;
    creatorId: string;
    price: number;
    timestamp: Date;
  });

  const {amount,}: { amount: number; } = $props();

  let page = $state(0);
  let data = $state<Record[]>();

  function fetchMore(start: number, take: number) {
    getDrinkHistoryRecords({start, take,}).then(d => data = d);
  }

  onMount(() => fetchMore(0, 20));

</script>

<Table>
  {#snippet paginate()}
    <TablePaginate total={amount} bind:page size={20} onchange={fetchMore}/>
  {/snippet}
  <thead>
    <TableRow>
      <TableHeadCell>Person</TableHeadCell>
      <TableHeadCell>Price</TableHeadCell>
      <TableHeadCell>Registered by</TableHeadCell>
      <TableHeadCell>Registered at</TableHeadCell>
    </TableRow>
  </thead>
  <tbody>
    {#each data as consumption(consumption.id)}
      <TableRow>
        <TableCell>{consumption.person.name}</TableCell>
        <TableCell>&euro;{displayPrice(consumption.price)}</TableCell>
        <TableCell>{consumption.creator.username}</TableCell>
        <TableCell>
          <DateComponent value={consumption.timestamp}/>
        </TableCell>
      </TableRow>
    {/each}
  </tbody>
</Table>

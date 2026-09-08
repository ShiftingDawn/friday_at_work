<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import BackButton from "$comp/back_button.svelte";
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import TableCell from "$comp/table_cell.svelte";
  import Table from "$comp/table.svelte";
  import DateComponent from "$comp/date.svelte";
  import TablePaginate from "$comp/table_paginate.svelte";
  import {fresh} from "$lib";
  import {getDrinkStockCheckHistoryRecords} from "$lib/functions/drinks.remote";
  import {onMount} from "svelte";

  type Record = {
    id: string;
    restockId: string | null;
    expected: number,
    actual: number,
    timestamp: Date,
    creator: { username: string, },
  };

  const {data,}: PageProps = $props();

  let page = $state(0);
  let records = $state<Record[]>();

  function fetchMore(start: number, take: number) {
    fresh(getDrinkStockCheckHistoryRecords({start, take,})).then(d => records = d);
  }

  onMount(() => fetchMore(0, 20));
</script>

<Card title={`${data.drink!.name} stock check history`}>
  {#snippet back()}
    <BackButton href={`/drinks/${data.drink!.id}`}/>
  {/snippet}
  {#if data.stockCheckCount === 0}
    <p>No stock checks yet</p>
  {:else}
    <Table>
      {#snippet paginate()}
        <TablePaginate total={data.stockCheckCount} bind:page size={20} onchange={fetchMore}/>
      {/snippet}
      <thead>
        <TableRow>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>Expected</TableHeadCell>
          <TableHeadCell>Actual</TableHeadCell>
          <TableHeadCell>Difference</TableHeadCell>
          <TableHeadCell>Corrected</TableHeadCell>
          <TableHeadCell>Registered by</TableHeadCell>
        </TableRow>
      </thead>
      <tbody>
        {#each records as check(check.id)}
          <TableRow>
            <TableCell>
              <DateComponent value={check.timestamp}/>
            </TableCell>
            <TableCell>{check.expected}</TableCell>
            <TableCell>{check.actual}</TableCell>
            <TableCell>{check.actual - check.expected}</TableCell>
            <TableCell>{check.restockId ? "Yes" : "No"}</TableCell>
            <TableCell>{check.creator.username}</TableCell>
          </TableRow>
        {/each}
      </tbody>
    </Table>
  {/if}
</Card>

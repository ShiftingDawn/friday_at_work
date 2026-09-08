<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import BackButton from "$comp/back_button.svelte";
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import TableCell from "$comp/table_cell.svelte";
  import Table from "$comp/table.svelte";
  import DateComponent from "$comp/date.svelte";
  import {fresh} from "$lib";
  import {getDrinkRestockHistoryRecords} from "$lib/functions/drinks.remote";
  import {onMount} from "svelte";
  import type {RestockType} from "@/generated/prisma/enums";
  import TablePaginate from "$comp/table_paginate.svelte";

  type Record = {
    id: string;
    amount: number,
    type: RestockType,
    timestamp: Date,
    creator: { username: string, },
  };

  const {data,}: PageProps = $props();

  let page = $state(0);
  let records = $state<Record[]>();

  function fetchMore(start: number, take: number) {
    fresh(getDrinkRestockHistoryRecords({start, take,})).then(d => records = d);
  }

  onMount(() => fetchMore(0, 20));
</script>

<Card title={`${data.drink!.name} restock history`}>
  {#snippet back()}
    <BackButton href={`/drinks/${data.drink!.id}`}/>
  {/snippet}
  {#if data.restockCount === 0}
    <p>No restocks yet</p>
  {:else}
    <Table>
      {#snippet paginate()}
        <TablePaginate total={data.restockCount} bind:page size={20} onchange={fetchMore}/>
      {/snippet}
      <thead>
        <TableRow>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>Type</TableHeadCell>
          <TableHeadCell>Amount</TableHeadCell>
          <TableHeadCell>Registered by</TableHeadCell>
        </TableRow>
      </thead>
      <tbody>
        {#each records as restock(restock.id)}
          <TableRow>
            <TableCell>
              <DateComponent value={restock.timestamp}/>
            </TableCell>
            <TableCell>{restock.type === "RESTOCK" ? "Restock" : "Correction"}</TableCell>
            <TableCell>{restock.amount}</TableCell>
            <TableCell>{restock.creator.username}</TableCell>
          </TableRow>
        {/each}
      </tbody>
    </Table>
  {/if}
</Card>

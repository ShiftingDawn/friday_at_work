<script lang="ts">
  import {displayPrice, fresh} from "$lib";
  import TableCell from "$comp/table_cell.svelte";
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import Table from "$comp/table.svelte";
  import DateComponent from "$comp/date.svelte";
  import Center from "$comp/center.svelte";
  import Spinner from "$comp/spinner.svelte";
  import TablePaginate from "$comp/table_paginate.svelte";
  import {getPersonCreditRecords} from "$lib/functions/people.remote";
  import {onMount} from "svelte";
  import Card from "$comp/card.svelte";
  import BackButton from "$comp/back_button.svelte";
  import HistoryTable from "@/routes/people/[person]/historytable.svelte";

  type Record = ({ creator: { username: string } } & {
    id: string
    amount: number
    personId: string
    creatorId: string
    timestamp: Date
  });

  const {data,} = $props();

  let page = $state(0);
  let records = $state<Record[]>();

  function fetchMore(start: number, take: number) {
    fresh(getPersonCreditRecords({start, take,})).then(d => records = d);
  }

  onMount(() => fetchMore(0, 20));
</script>

<Card title={`${data.person!.name} credits`}>
  {#snippet back()}
    <BackButton href={`/people/${data.person!.id}`}/>
  {/snippet}
  <p>Records with a dark color have been reset already</p>
  <Table>
    {#snippet paginate()}
      <TablePaginate total={data.creditHistorySize} bind:page size={20} onchange={fetchMore}/>
    {/snippet}
    <thead>
      <TableRow>
        <TableHeadCell>Amount</TableHeadCell>
        <TableHeadCell>Registered by</TableHeadCell>
        <TableHeadCell>Registered at</TableHeadCell>
      </TableRow>
    </thead>
    <tbody>
      {#each records as credit(`credit_${credit.timestamp.getTime()}`)}
        <TableRow class={
      data.person!.reset && credit.timestamp < data.person!.reset
        ? "bg-historytable-marked text-historytable-marked-text"
        : undefined
       }>
          <TableCell>&euro;{displayPrice(credit.amount)}</TableCell>
          <TableCell>{credit.creator.username}</TableCell>
          <TableCell>
            <DateComponent value={credit.timestamp}/>
          </TableCell>
        </TableRow>
      {/each}
    </tbody>
  </Table>
  {#if records === undefined}
    <Center>
      <Spinner/>
    </Center>
  {/if}
</Card>

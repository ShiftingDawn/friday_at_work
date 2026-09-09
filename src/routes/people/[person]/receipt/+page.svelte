<script lang="ts">
  import {displayPrice, fresh} from "$lib";
  import TableCell from "$comp/table_cell.svelte";
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import Table from "$comp/table.svelte";
  import DateComponent from "$comp/date.svelte";
  import Date from "$comp/date.svelte";
  import Center from "$comp/center.svelte";
  import Spinner from "$comp/spinner.svelte";
  import TablePaginate from "$comp/table_paginate.svelte";
  import {getPersonReceiptData, getPersonReceipts} from "$lib/functions/people.remote";
  import {onMount} from "svelte";
  import Card from "$comp/card.svelte";
  import BackButton from "$comp/back_button.svelte";
  import Modal from "$comp/modal.svelte";

  interface Record {
    id: string
    personId: string
    from: Date | null
    to: Date,
    creator: { username: string }
    _count: { history: number },
  }

  const {data,} = $props();

  let page = $state(0);
  let records = $state<Record[]>();
  let selected = $state<string>();

  function fetchMore(start: number, take: number) {
    fresh(getPersonReceipts({start, take,})).then(d => records = d);
  }

  onMount(() => fetchMore(0, 20));
</script>

<Modal title="Receipt data" open={Boolean(selected)} onclose={() => selected = undefined}>
  {#await getPersonReceiptData({person: data.person!.id, receipt: selected!,})}
    <Center>
      <Spinner/>
    </Center>
  {:then records}
    <Table>
      <thead>
        <TableRow>
          <TableHeadCell>Drink</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
          <TableHeadCell>Registered by</TableHeadCell>
          <TableHeadCell>Registered at</TableHeadCell>
        </TableRow>
      </thead>
      <tbody>
        {#each records as consumption(`history_${consumption.timestamp.getTime()}`)}
          <TableRow>
            <TableCell>{consumption.drink!.name}</TableCell>
            <TableCell>&euro;{displayPrice(consumption.price)}</TableCell>
            <TableCell>{consumption.creator.username}</TableCell>
            <TableCell>
              <Date value={consumption.timestamp}/>
            </TableCell>
          </TableRow>
        {/each}
      </tbody>
    </Table>
  {/await}
</Modal>
<Card title={`${data.person!.name} receipt history`}>
  {#snippet back()}
    <BackButton href={`/people/${data.person!.id}`}/>
  {/snippet}
  <p>Click any receipt to view details</p>
  <Table>
    {#snippet paginate()}
      <TablePaginate total={data.receiptCount} bind:page size={20} onchange={fetchMore}/>
    {/snippet}
    <thead>
      <TableRow>
        <TableHeadCell>Consumptions</TableHeadCell>
        <TableHeadCell>Since</TableHeadCell>
        <TableHeadCell>Until</TableHeadCell>
        <TableHeadCell>Reset by</TableHeadCell>
      </TableRow>
    </thead>
    <tbody>
      {#each records as receipt(`receipt_${receipt.id}`)}
        <TableRow onclick={() => selected = receipt.id} class="cursor-pointer">
          <TableCell>{receipt._count.history}</TableCell>
          <TableCell>
            {#if receipt.from}
              <DateComponent value={receipt.from}/>
            {:else}
              Workspace creation
            {/if}
          </TableCell>
          <TableCell>
            <DateComponent value={receipt.to}/>
          </TableCell>
          <TableCell>{receipt.creator.username}</TableCell>
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

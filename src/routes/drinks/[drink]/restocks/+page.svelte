<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import BackButton from "$comp/back_button.svelte";
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import TableCell from "$comp/table_cell.svelte";
  import {displayDate} from "$lib";
    import Table from "$comp/table.svelte";

  const {data,}: PageProps = $props();
</script>

<Card title={`${data.drink!.name} restock history`}>
  {#snippet back()}
    <BackButton href={`/drinks/${data.drink!.id}`}/>
  {/snippet}
  {#if !data.drink?.restocks?.length}
    <p>No restocks yet</p>
  {:else}
    <Table>
      <thead>
      <TableRow>
        <TableHeadCell>Date</TableHeadCell>
        <TableHeadCell>Type</TableHeadCell>
        <TableHeadCell>Amount</TableHeadCell>
        <TableHeadCell>Registered by</TableHeadCell>
      </TableRow>
      </thead>
      <tbody>
      {#each data.drink!.restocks as restock(restock.id)}
        <TableRow>
          <TableCell>{displayDate(restock.timestamp)}</TableCell>
          <TableCell>{restock.type === "RESTOCK" ? "Restock" : "Correction"}</TableCell>
          <TableCell>{restock.amount}</TableCell>
          <TableCell>{restock.creator.username}</TableCell>
        </TableRow>
      {/each}
      </tbody>
    </Table>
  {/if}
</Card>

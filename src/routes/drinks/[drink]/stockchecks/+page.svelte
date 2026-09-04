<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import BackButton from "$comp/back_button.svelte";
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import TableCell from "$comp/table_cell.svelte";
  import Table from "$comp/table.svelte";
  import Date from "$comp/date.svelte";

  const {data,}: PageProps = $props();
</script>

<Card title={`${data.drink!.name} stock check history`}>
  {#snippet back()}
    <BackButton href={`/drinks/${data.drink!.id}`}/>
  {/snippet}
  {#if !data.drink?.stockChecks?.length}
    <p>No restocks yet</p>
  {:else}
    <Table>
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
        {#each data.drink!.stockChecks as check(check.id)}
          <TableRow>
            <TableCell>
              <Date value={check.timestamp}/>
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

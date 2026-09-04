<script lang="ts">
  import type {PageProps} from "./$types";
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import TableCell from "$comp/table_cell.svelte";
  import {displayPrice, fresh} from "$lib";
  import Button from "$comp/button.svelte";
  import Modal from "$comp/modal.svelte";
  import {getDrinksForConsumption} from "$lib/functions/consumption.remote";
  import Center from "$comp/center.svelte";
  import Spinner from "$comp/spinner.svelte";
  import {deleteDrinkHistoryRecord, modifyDrinkHistoryRecord} from "$lib/functions/drinks.remote";
  import {flash} from "$lib/flash";
  import FormLabel from "$comp/form_label.svelte";
  import FormSelect from "$comp/form_select.svelte";
  import FormInput from "$comp/form_input.svelte";
  import {invalidateAll} from "$app/navigation";
  import Table from "$comp/table.svelte";
  import Date from "$comp/date.svelte";
  import TablePaginate from "$comp/table_paginate.svelte";
  import {getPersonHistoryRecords} from "$lib/functions/people.remote";
  import {onMount} from "svelte";

  type Record = ({ drink: { name: string }, creator: { username: string } } & {
    id: string,
    workspaceId: string,
    personId: string,
    drinkId: string,
    creatorId: string,
    price: number,
    timestamp: globalThis.Date
  });
  const {
    canAdmin,
    person,
    amount,
  }: {
    canAdmin: boolean;
    person: PageProps["data"]["person"];
    amount: number;
  } = $props();

  let page = $state(0);
  let data = $state<Record[]>();
  let editModalData = $state<Record>();
  let deleteModalData = $state<Record>();

  function fetchMore(start: number, take: number) {
    fresh(getPersonHistoryRecords({start, take,})).then(d => data = d);
  }

  onMount(() => fetchMore(0, 20));

  $effect(() => {
    if (editModalData) {
      modifyDrinkHistoryRecord.fields.set({
        drink: editModalData.drinkId,
        price: editModalData.price,
        timestamp: editModalData.timestamp.toISOString().split("T")[0],
      });
    }
  });
</script>

{#if canAdmin}
  <form {...modifyDrinkHistoryRecord.enhance(async form => {
    try {
      if (await form.submit()) {
        editModalData = undefined;
        flash("success", "Edited history record successfully");
      } else {
        flash("error", "Could not edit history record");
      }
    } catch {
      flash("error", "Could not edit history record", "An unknown error occurred");
    }
  })}>
    <Modal title="Edit history record" open={Boolean(editModalData)} onclose={() => editModalData = undefined}>
      {#await getDrinksForConsumption()}
        <Center>
          <Spinner>Loading data</Spinner>
        </Center>
      {:then drinks}
        <div class="flex flex-col gap-4">
          <input type="hidden" name="id" value={editModalData!.id}/>
          <FormLabel name="Drink" error={modifyDrinkHistoryRecord.fields.drink.issues()}>
            <FormSelect {...modifyDrinkHistoryRecord.fields.drink.as("select")}>
              {#each drinks as drink(drink.id)}
                <option value={drink.id} selected={drink.id === editModalData!.drinkId}>
                  {drink.name}
                </option>
              {/each}
            </FormSelect>
          </FormLabel>
          <FormLabel name="Price" error={modifyDrinkHistoryRecord.fields.price.issues()}>
            <FormInput {...modifyDrinkHistoryRecord.fields.price.as("number")} required min="1"/>
          </FormLabel>
          <FormLabel name="Timestamp" error={modifyDrinkHistoryRecord.fields.timestamp.issues()}>
            <FormInput {...modifyDrinkHistoryRecord.fields.timestamp.as("date")} required/>
          </FormLabel>
        </div>
      {/await}
      {#snippet actions()}
        <Button type="submit" disabled={getDrinksForConsumption().loading}>
          Save modifications
        </Button>
      {/snippet}
    </Modal>
  </form>
  <Modal title="Delete record" open={Boolean(deleteModalData)} onclose={() => deleteModalData = undefined}>
    <p>Are you sure you want to delete the following data?</p>
    <p>This cannot be undone!</p>
    <div class="grid grid-cols-2 bg-base p-4 rounded-md">
      <strong>Drink</strong>
      <span>{deleteModalData!.drink.name}</span>
      <strong>Price</strong>
      <span>&euro;{displayPrice(deleteModalData!.price)}</span>
      <strong>Timestamp</strong>
      <span><Date value={deleteModalData!.timestamp}/></span>
    </div>
    {#snippet actions()}
      <Button type="button" onclick={async () => {
        flash("info", "Deleting record...");
        await deleteDrinkHistoryRecord(deleteModalData!.id);
        deleteModalData = undefined;
        await invalidateAll();
        flash("success", "Record has been deleted");
      }}>
        Delete
      </Button>
    {/snippet}
  </Modal>
{/if}

<Table>
  {#snippet paginate()}
    <TablePaginate total={amount} bind:page size={20} onchange={fetchMore}/>
  {/snippet}
  <thead>
    <TableRow>
      <TableHeadCell>Drink</TableHeadCell>
      <TableHeadCell>Price</TableHeadCell>
      <TableHeadCell>Registered by</TableHeadCell>
      <TableHeadCell>Registered at</TableHeadCell>
      {#if canAdmin}
        <TableHeadCell/>
      {/if}
    </TableRow>
  </thead>
  <tbody>
    {#each data as consumption(`history_${consumption.timestamp.getTime()}`)}
      <TableRow class={
      person!.reset && consumption.timestamp < person!.reset
        ? "bg-historytable-marked text-historytable-marked-text"
        : undefined
       }>
        <TableCell>{consumption.drink!.name}</TableCell>
        <TableCell>&euro;{displayPrice(consumption.price)}</TableCell>
        <TableCell>{consumption.creator.username}</TableCell>
        <TableCell>
          <Date value={consumption.timestamp}/>
        </TableCell>
        {#if canAdmin}
          <TableHeadCell>
            <div class="flex gap-4">
              <Button onclick={() => editModalData = consumption}>
                Edit
              </Button>
              <Button onclick={() => deleteModalData = consumption}>
                Delete
              </Button>
            </div>
          </TableHeadCell>
        {/if}
      </TableRow>
    {/each}
  </tbody>
</Table>
{#if data === undefined}
  <Center>
    <Spinner/>
  </Center>
{/if}

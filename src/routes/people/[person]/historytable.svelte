<script lang="ts">
  import type {PageProps} from "./$types";
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import TableCell from "$comp/table_cell.svelte";
  import {displayPrice} from "$lib";
  import Button from "$comp/button.svelte";
  import Modal from "$comp/modal.svelte";
  import {getDrinksForConsumption} from "$lib/functions/consumption.remote";
  import Center from "$comp/center.svelte";
  import Spinner from "$comp/spinner.svelte";
  import {modifyDrinkHistoryRecord} from "$lib/functions/drinks.remote";
  import {flash} from "$lib/flash";
  import FormLabel from "$comp/form_label.svelte";
  import FormSelect from "$comp/form_select.svelte";
  import FormInput from "$comp/form_input.svelte";

  const {
    canAdmin,
    person,
    consumptions,
  }: {
    canAdmin: boolean;
    person: PageProps["data"]["person"];
    consumptions: PageProps["data"]["allConsumptions"];
  } = $props();

  let editModalData = $state<App.Unpacked<PageProps["data"]["allConsumptions"]>>();

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
        <input type="hidden" name="id" value={editModalData!.id} />
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

<table class="w-full">
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
  {#each consumptions as consumption(`history_${consumption.timestamp.getTime()}`)}
    <TableRow
      class={person!.reset && consumption.timestamp < person!.reset ? "bg-ctp-mantle/50" : undefined}>
      <TableCell>{consumption.drink!.name}</TableCell>
      <TableCell>&euro;{displayPrice(consumption.price)}</TableCell>
      <TableCell>{consumption.creator.username}</TableCell>
      <TableCell>{consumption.timestamp.toLocaleDateString("en-us", {dateStyle: "long",})}</TableCell>
      {#if canAdmin}
        <TableHeadCell>
          <Button onclick={() => editModalData = consumption}>
            Edit
          </Button>
        </TableHeadCell>
      {/if}
    </TableRow>
  {/each}
  </tbody>
</table>

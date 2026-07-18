<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$lib/components/card.svelte";
  import BackButton from "$lib/components/back_button.svelte";
  import Section from "$lib/components/section.svelte";
  import {enhance} from "$app/forms";
  import FormInput from "$lib/components/form_input.svelte";
  import FormLabel from "$lib/components/form_label.svelte";
  import Button from "@/lib/components/button.svelte";
  import {displayPrice} from "$lib";
  import IconButton from "$lib/components/icon_button.svelte";
  import IconReset from "$lib/icon/reset.svelte";
  import TableRow from "$lib/components/table_row.svelte";
  import TableHeadCell from "$lib/components/table_headcell.svelte";
  import TableCell from "$lib/components/table_cell.svelte";

  const {data,}: PageProps = $props();
  const totalPrice = $derived(!data.consumptions?.length ? 0 : data.consumptions!.map(c => c.price * c.count).reduce((a, b) => a + b));
  let updateFormLoading = $state(false);
</script>

<Card title={data.person!.name}>
    {#snippet back()}
        <BackButton href="/people"/>
    {/snippet}
    {#if data.canAdmin}
        <Section name="Update data">
            <form method="POST" action="?/update" class="max-w-md flex flex-col gap-4" use:enhance={() => {
              updateFormLoading = true;
              return async ({update,}) => {
                await update();
                updateFormLoading = false;
              };
            }}>
                <FormLabel name="Name">
                    <FormInput type="text" min="3" name="name" value={data.person!.name} disabled={updateFormLoading}/>
                </FormLabel>
                <Button type="submit" loading={updateFormLoading}>
                    Save
                </Button>
            </form>
        </Section>
    {:else}
        <Section name="Data">
            <p>Name: {data.person!.name}</p>
        </Section>
    {/if}
</Card>
<Card title="Receipt" class="mt-4">
    {#snippet action()}
        <span class="text-ctp-blue font-bold text-xl mr-4">
            &euro;{displayPrice(totalPrice)}
        </span>
        {#if data.canAdmin && (data.consumptions?.length || 0) > 0}
            <form method="POST" action="?/resetconsumptions">
                <IconButton type="submit">
                    <IconReset/>
                </IconButton>
            </form>
        {/if}
    {/snippet}
    {#if data.consumptions?.length === 0}
        <p>No consumptions yet</p>
    {:else}
        <table class="w-full">
            <thead>
            <TableRow>
                <TableHeadCell>Drink</TableHeadCell>
                <TableHeadCell>Price</TableHeadCell>
                <TableHeadCell>Amount</TableHeadCell>
                <TableHeadCell>Total</TableHeadCell>
            </TableRow>
            </thead>
            <tbody>
            {#each data.consumptions! as consumption(consumption.id)}
                <TableRow>
                    <TableCell>{consumption.drink!.name}</TableCell>
                    <TableCell>&euro;{displayPrice(consumption.price)}</TableCell>
                    <TableCell>{consumption.count}</TableCell>
                    <TableCell>&euro;{displayPrice(consumption.price, consumption.count)}</TableCell>
                </TableRow>
            {/each}
            </tbody>
        </table>
    {/if}
</Card>

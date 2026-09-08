<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import BackButton from "$comp/back_button.svelte";
  import Section from "$comp/section.svelte";
  import Button from "$comp/button.svelte";
  import {displayPrice} from "$lib";
  import {resetPersonConsumptions, updatePerson} from "$lib/functions/people.remote";
  import {flash} from "$lib/flash";
  import {onMount} from "svelte";
  import {invalidateAll} from "$app/navigation";
  import ReceiptTable from "./receipttable.svelte";
  import HistoryTable from "./historytable.svelte";
  import EditPersonModal from "./editpersonmodal.svelte";
  import AddCreditModal from "./addcreditmodal.svelte";

  const {data,}: PageProps = $props();
  const totalPrice = $derived(!data.consumptions?.length ? 0 : data.consumptions!.map(c => c.price * c.count).reduce((a, b) => a + b));
  const totalPriceWithCredit = $derived(Math.max(0, totalPrice - (data.credit?._sum?.amount ?? 0)));

  onMount(() => updatePerson.fields.set({name: data.person!.name,}));
</script>

<Card title={data.person!.name}>
  {#snippet back()}
    <BackButton href="/people"/>
  {/snippet}
  <Section name="Data">
    <p>Name: {data.person!.name}</p>
    {#if data.credit?._sum?.amount}
      <p>Credit: &euro;{displayPrice(data.credit._sum.amount)}</p>
    {:else}
      <p>Credit: none</p>
    {/if}
    {#if data.canAdmin}
      <div class="flex flex-col gap-4 md:flex-row mt-4">
        <AddCreditModal person={data.person}/>
        <Button as="a" href={`/people/${data.person!.id}/credit`}>Credit history</Button>
        <EditPersonModal person={data.person}/>
      </div>
    {/if}
  </Section>
  <Section name="Receipt">
    <div class="mb-4">
      <p>Receipt: &euro;{displayPrice(totalPrice)}</p>
      <p>Receipt with credit: &euro;{displayPrice(totalPriceWithCredit)}</p>
      {#if data.canAdmin && (data.consumptions?.length || 0) > 0}
        <Button onclick={async () => {
          flash("info", "Resetting receipt...");
          await resetPersonConsumptions();
          await invalidateAll();
          flash("success", "Receipt has been reset successfully");
        }} class="mt-4">
          Reset receipt
        </Button>
      {/if}
    </div>
    <ReceiptTable consumptions={data.consumptions}/>
  </Section>
</Card>
{#if data.consumptionHistorySize! > 0}
  <Card title="History" class="mt-4">
    <HistoryTable canAdmin={data.canAdmin} person={data.person} amount={data.consumptionHistorySize!}/>
    <p>Records with a dark color have been reset already</p>
  </Card>
{/if}

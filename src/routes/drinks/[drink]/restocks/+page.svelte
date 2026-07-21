<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import BackButton from "$comp/back_button.svelte";

  const {data,}: PageProps = $props();
</script>

<Card title={`${data.drink!.name} restock history`}>
    {#snippet back()}
        <BackButton href={`/drinks/${data.drink!.id}`}/>
    {/snippet}
    {#if !data.drink?.restocks?.length}
        <p>No restocks yet</p>
    {:else}
        <ul>
            {#each data.drink!.restocks as restock(restock.id)}
                <li>{restock.amount} at {restock.timestamp.toLocaleDateString("en-US", {dateStyle: "long",})}</li>
            {/each}
        </ul>
    {/if}
</Card>

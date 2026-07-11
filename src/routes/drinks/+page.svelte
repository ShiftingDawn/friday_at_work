<script lang="ts">
    import type {PageProps} from "./$types";
    import {page} from "$app/state";
    import Card from "$lib/components/card.svelte";
    import LinkButton from "$lib/components/link_button.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import FormButton from "$lib/components/form_button.svelte";
    import IconDrink from "$lib/icon/drinks.svelte";

    const {data}: PageProps = $props();
    const showHidden = $derived(new URLSearchParams(page.url.search).has("hidden", "true"));
</script>

<Card title="Register new drink" as="form" method="POST" class="flex flex-col gap-4" enctype="multipart/form-data">
    {#snippet action()}
        <FormButton type="submit">
            Save
        </FormButton>
    {/snippet}
    <div class="flex flex-col lg:flex-row gap-4">
        <FormLabel name="Name">
            <FormInput type="text" min="3" name="name"/>
        </FormLabel>
        <FormLabel name="Price">
            <FormInput type="number" min="0" name="price"/>
        </FormLabel>
        <FormLabel name="Image">
            <FormInput type="file" name="image" class="p-0 file:h-8 file:bg-ctp-surface2 file:px-2 file:mr-2"/>
        </FormLabel>
    </div>
</Card>
<div class="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each data.drinks as drink}
        <Card as="a" href={`/drinks/${drink.id}`}>
            <div class="font-bold text-center text-2xl">{drink.name}</div>
            <div class="w-full py-8 px-4 aspect-square flex items-center justify-center">
                {#if drink.image}
                    <img src={drink.image} class="min-w-full aspect-square"/>
                {:else}
                    <div class="w-32">
                        <IconDrink/>
                    </div>
                {/if}
            </div>
            <div class="font-bold text-center text-2xl">
                &euro;&nbsp;{(drink.price / 100).toFixed(2)}
            </div>
        </Card>
    {/each}
</div>
<Card class="mt-4">
    {#if !showHidden}
        <LinkButton href="/drinks?hidden=true">Show hidden</LinkButton>
    {:else}
        <LinkButton href="/drinks?hidden=false">Hide hidden</LinkButton>
    {/if}
</Card>
{#if showHidden}
    <div class="mt-4 grid grid-cols-4 gap-4">
        {#each data.hidden! as drink}
            <Card as="a" href={`/drinks/${drink.id}`}>
                <div class="font-bold text-center text-2xl">{drink.name}</div>
                <div class="w-full py-8 px-4 aspect-square flex items-center justify-center">
                    {#if drink.image}
                        <img src={drink.image} class="min-w-full aspect-square"/>
                    {:else}
                        <div class="w-32">
                            <IconDrink/>
                        </div>
                    {/if}
                </div>
                <div class="font-bold text-center text-2xl">
                    &euro;&nbsp;{(drink.price / 100).toFixed(2)}
                </div>
            </Card>
        {/each}
    </div>
{/if}
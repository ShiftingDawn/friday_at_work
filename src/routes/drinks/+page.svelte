<script lang="ts">
    import type {PageProps} from "./$types";
    import {page} from "$app/state";
    import Card from "$lib/components/card.svelte";
    import Section from "$lib/components/section.svelte";
    import Modal from "$lib/components/modal.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import Button from "$lib/components/button.svelte";
    import IconButton from "$lib/components/icon_button.svelte";
    import IconDrink from "$lib/icon/drinks.svelte";
    import IconCreate from "$lib/icon/plus.svelte";
    import IconHide from "$lib/icon/hide.svelte";
    import IconShow from "$lib/icon/show.svelte";
    import {getStorageUrl} from "$lib/client/storage";

    const {data}: PageProps = $props();
    const showHidden = $derived(new URLSearchParams(page.url.search).has("hidden", "true"));
    let modalOpen = $state(false);
</script>

<form method="POST" enctype="multipart/form-data">
    <Modal title="Register new drink" open={modalOpen} onclose={() => modalOpen = false}>
        <div class="flex flex-col gap-4">
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
        {#snippet actions()}
            <Button type="submit" class="font-bold uppercase">
                Add
            </Button>
        {/snippet}
    </Modal>
</form>
<Card title="Manage drinks">
    {#snippet action()}
        {#if !showHidden}
            <IconButton as="a" href="/drinks?hidden=true">
                <IconHide/>
            </IconButton>
        {:else}
            <IconButton as="a" href="/drinks?hidden=false">
                <IconShow/>
            </IconButton>
        {/if}
        {#if data.canWrite}
            <IconButton onclick={() => modalOpen = true}>
                <IconCreate/>
            </IconButton>
        {/if}
    {/snippet}
    <div class="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each data.drinks as drink}
            <Card as="a" href={`/drinks/${drink.id}`} class="bg-ctp-surface1 shadow-none">
                <div class="font-bold text-center text-2xl">{drink.name}</div>
                <div class="w-full py-8 px-4 aspect-square flex items-center justify-center">
                    <img src={getStorageUrl(drink.id)} class="min-w-full aspect-square"/>
                </div>
                <div class="font-bold text-center text-2xl">
                    &euro;&nbsp;{(drink.price / 100).toFixed(2)}
                </div>
            </Card>
        {/each}
    </div>
    {#if showHidden}
        <Section name="Hidden drinks">
            <div class="mt-4 grid grid-cols-4 gap-4">
                {#each data.hidden! as drink}
                    <Card as="a" href={`/drinks/${drink.id}`} class="bg-ctp-surface1">
                        <div class="font-bold text-center text-2xl">{drink.name}</div>
                        <div class="w-full py-8 px-4 aspect-square flex items-center justify-center">
                            <img src={getStorageUrl(drink.id)} class="min-w-full aspect-square"/>
                        </div>
                        <div class="font-bold text-center text-2xl">
                            &euro;&nbsp;{(drink.price / 100).toFixed(2)}
                        </div>
                    </Card>
                {/each}
            </div>
        </Section>
    {/if}
</Card>
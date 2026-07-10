<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import FormButton from "$lib/components/form_button.svelte";

    import iconDrink from "$lib/assets/drinks.svg";

    const {data}: PageProps = $props();
</script>

<Card as="form" method="POST" class="flex flex-col gap-4" enctype="multipart/form-data">
    <span class="text-xl">Register new drink</span>
    <div class="flex gap-4">
        <FormLabel name="Name">
            <FormInput type="text" min="3" name="name"/>
        </FormLabel>
        <FormLabel name="Price">
            <FormInput type="number" min="0" name="price"/>
        </FormLabel>
        <FormLabel name="Image">
            <FormInput type="file" name="image" class="p-0 file:h-8 file:bg-ctp-surface2 file:px-2 file:mr-2" />
        </FormLabel>
        <FormButton type="submit">
            Save
        </FormButton>
    </div>
</Card>
<div class="mt-4 grid grid-cols-4 gap-4">
    {#each data.drinks as drink}
        <Card as="a" href={`/drinks/${drink.id}`}>
            <div class="font-bold text-center text-2xl">{drink.name}</div>
            <div class="w-full py-8 px-4 aspect-square">
                {#if drink.image}
                    <img src={drink.image} class="min-w-full aspect-square"/>
                {:else}
                    <img src={iconDrink} class="w-full aspect-square"/>
                {/if}
            </div>
            <div class="font-bold text-center text-2xl">
                &euro;&nbsp;{(drink.price / 100).toFixed(2)}
            </div>
        </Card>
    {/each}
</div>
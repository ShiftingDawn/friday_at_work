<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import IconDrinks from "$lib/icon/drinks.svelte"
    import FormButton from "$lib/components/form_button.svelte";
    import FormRadio from "$lib/components/form_radio.svelte";

    const {data}: PageProps = $props();
</script>

<form method="POST" class="flex flex-col gap-4">
    <Card title="Select person" class="flex flex-col gap-4">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each data.people as person}
                <FormRadio name="person" value={person.id}>
                    {person.name}
                </FormRadio>
            {/each}
        </div>
    </Card>
    <Card title="Select drink" class="flex flex-col gap-4">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each data.drinks as drink}
                <FormRadio name="drink" value={drink.id}>
                    {#if drink.image}
                        <img src={drink.image} class="w-32 aspect-square"/>
                    {:else }
                        <div class="w-32">
                            <IconDrinks/>
                        </div>
                    {/if}
                    {drink.name}
                </FormRadio>
            {/each}
        </div>
    </Card>
    <Card>
        <FormButton type="submit" class="self-start">
            Submit
        </FormButton>
    </Card>
</form>
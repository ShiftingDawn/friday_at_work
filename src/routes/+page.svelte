<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import IconDrinks from "$lib/icon/drinks.svelte"
    import IconSubmit from "$lib/icon/submit.svelte"
    import IconButton from "$lib/components/icon_button.svelte";
    import FormRadio from "$lib/components/form_radio.svelte";
    import Section from "@/lib/components/section.svelte";

    const {data}: PageProps = $props();
</script>

<Card title="Register consumption" as="form" method="POST" class="flex flex-col gap-4">
    {#snippet action()}
        <IconButton type="submit">
            <IconSubmit/>
        </IconButton>
    {/snippet}
    <Section name="Select person" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each data.people as person}
            <FormRadio name="person" value={person.id}>
                {person.name}
            </FormRadio>
        {/each}
    </Section>
    <Section name="Select drink" class="flex flex-col gap-4">
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
    </Section>
</Card>
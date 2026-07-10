<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import iconDrinks from "$lib/assets/drinks.svg"

    const {data}: PageProps = $props();
</script>

<form method="POST" class="flex flex-col gap-4">
    <Card class="flex flex-col gap-4">
        <span class="text-xl">Select person</span>
        <div class="grid grid-cols-4 gap-4">
            {#each data.people as person}
                <label class="relative rounded-[50px] bg-ctp-surface1 h-12 p-2 flex items-center justify-center has-checked:bg-ctp-lavender has-checked:rounded-xl transition-all has-checked:text-ctp-base">
                    <input type="radio" name="person" value={person.id} class="appearance-none absolute"/>
                    {person.name}
                </label>
            {/each}
        </div>
    </Card>
    <Card class="flex flex-col gap-4">
        <span class="text-xl">Select drink</span>
        <div class="grid grid-cols-4 gap-4">
            {#each data.drinks as drink}
                <label class="flex flex-col gap-2 relative rounded-[50px] p-2 bg-ctp-surface1 items-center justify-center has-checked:bg-ctp-lavender has-checked:rounded-xl transition-all has-checked:text-ctp-base">
                    <input type="radio" name="drink" value={drink.id} class="appearance-none absolute"/>
                    {#if drink.image}
                        <img src={drink.image} class="w-32 aspect-square" />
                    {:else }
                        <img src={iconDrinks} class="w-32 aspect-square" />
                    {/if}
                    {drink.name}
                </label>
            {/each}
        </div>
    </Card>
    <button type="submit" class="fixed bottom-4 w-16 h-16 rounded-full bg-ctp-surface0 left-1/2 -translate-x-1/2">
        Submit
    </button>
</form>
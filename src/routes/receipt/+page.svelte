<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";

    const {data}: PageProps = $props();
</script>

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each data.consumption as person}
        <Card as="a" href={`/receipt/${person.id}`} title={person.name}>
            <span>Consumed {person._count.consumptions} drinks</span>
        </Card>
    {/each}
</div>
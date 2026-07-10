<script lang="ts">
    import type {Snippet} from "svelte";

    const {
        name,
        children
    }: {
        name: string,
        children: Snippet
    } = $props();
</script>

<label class="flex flex-col gap-2">
    {name}
    {@render children()}
</label>
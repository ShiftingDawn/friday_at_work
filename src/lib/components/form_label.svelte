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

<label class="flex flex-col bg-ctp-overlay2 rounded-2xl">
    <span class="pl-4 pr-2 text-ctp-base font-bold">{name}</span>
    <span class="p-1">
        {@render children()}
    </span>
</label>
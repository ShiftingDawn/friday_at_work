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

<label class="flex bg-ctp-overlay2 rounded-full items-center">
    <span class="pl-4 pr-2 text-ctp-base font-bold">{name}</span>
    {@render children()}
</label>
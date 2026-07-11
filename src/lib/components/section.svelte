<script lang="ts">

    import type {Snippet} from "svelte";
    import {twMerge} from "tailwind-merge";

    const {
        name,
        children
    }: {
        name?: string,
        children?: Snippet
    } = $props();
</script>

<div class={twMerge(
    "border-4 border-ctp-surface1 rounded-lg p-4 relative",
    name && "mt-6 pt-6"
)}>
    {#if name}
        <div class="absolute bg-ctp-surface1 px-2 py-1 rounded-full -top-4.5">
            {name}
        </div>
    {/if}
    {@render children?.()}
</div>
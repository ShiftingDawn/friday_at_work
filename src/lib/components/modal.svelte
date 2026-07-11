<script lang="ts">
    import type {Snippet} from "svelte";
    import {fade} from "svelte/transition";
    import {twMerge} from "tailwind-merge";

    const {
        open,
        onclose,
        title,
        children,
        actions,
    }: {
        open: boolean,
        onclose: () => void,
        title?: string,
        children: Snippet,
        actions?: Snippet
    } = $props();
</script>

<div class={twMerge(
    "fixed z-50 top-0 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center backdrop-blur-none transition-all",
    open && "bg-ctp-mabg-ctp-corentle/50 backdrop-blur-xs pointer-events-auto"
)} onclick={() => onclose()}>
    {#if open}
        <div in:fade={{duration: 150}} out:fade={{duration: 150}}
             class="min-w-xs bg-ctp-surface0 rounded-lg shadow-lg flex flex-col gap-2" onclick={e => e.stopPropagation()}>
            {#if title}
                <div class="text-xl font-bold uppercase bg-ctp-surface1 p-4 rounded-t-lg shadow-lg">{title}</div>
            {/if}
            <div class="p-4">
                {@render children()}
            </div>
            {#if actions}
                <div class="flex items-center gap-2 justify-end p-4 rounded-b-lg">
                    {@render actions()}
                </div>
            {/if}
        </div>
    {/if}
</div>
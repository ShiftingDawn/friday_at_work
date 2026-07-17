<script lang="ts">
    import type {Snippet} from "svelte";
    import {twMerge} from "tailwind-merge";

    const {
        name,
        class: cls,
        children
    }: {
        name: string,
        class?: string,
        children: Snippet
    } = $props();
</script>

<label class={twMerge("flex flex-col bg-ctp-overlay2 rounded-2xl", cls)}>
    <span class="pl-4 pr-2 text-ctp-base font-bold">{name}</span>
    <span class="p-1">
        {@render children()}
    </span>
</label>
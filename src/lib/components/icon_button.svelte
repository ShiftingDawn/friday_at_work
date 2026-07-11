<script lang="ts">
    import type {HTMLButtonAttributes} from "svelte/elements";
    import {twMerge} from "tailwind-merge";

    const {class: cls, children, ...props}: HTMLButtonAttributes = $props();
</script>

<button class={twMerge("w-8 h-8 bg-ctp-surface1 rounded-full cursor-pointer hover:bg-ctp-lavender hover:text-ctp-base transition-all p-1", cls as any)} {...props}>
    {@render children?.()}
</button>
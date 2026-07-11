<script lang="ts">
    import type {HTMLButtonAttributes} from "svelte/elements";
    import {twMerge} from "tailwind-merge";

    const {class: cls, children, ...props}: HTMLButtonAttributes = $props();
</script>

<button {...props} class={twMerge(
    "bg-ctp-surface1 h-8 self-end px-4 rounded-full cursor-pointer hover:bg-ctp-lavender hover:text-ctp-base transition-all",
    cls as any
    )}
>
    {@render children?.()}
</button>
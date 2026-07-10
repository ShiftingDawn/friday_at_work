<script lang="ts">
    import type {HTMLAnchorAttributes} from "svelte/elements";
    import {twMerge} from "tailwind-merge";

    const {class: cls, children, ...props}: HTMLAnchorAttributes = $props();
</script>

<a {...props} class={twMerge("flex bg-ctp-surface1 h-8 px-4 rounded-full w-fit items-center justify-center", cls as any)}>
    {@render children?.()}
</a>
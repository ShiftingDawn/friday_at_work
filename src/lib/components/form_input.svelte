<script lang="ts">
    import type {HTMLInputAttributes} from "svelte/elements";
    import {twMerge} from "tailwind-merge";

    const {class: cls, ...props}: HTMLInputAttributes = $props();
</script>

<input {...props} class={twMerge("bg-ctp-surface1 h-8 rounded-full px-4 py-2", cls as any)}/>
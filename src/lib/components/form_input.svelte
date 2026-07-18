<script lang="ts">
    import type {HTMLInputAttributes} from "svelte/elements";
    import {twMerge} from "tailwind-merge";

    const {
        class: cls,
        disabled,
        ...props
    }: HTMLInputAttributes = $props();
</script>

<input {...props} disabled={disabled}
       class={twMerge(
           "w-full bg-ctp-surface1 h-8 rounded-full px-4 py-2",
           disabled && "cursor-not-allowed",
           cls as any
           )}
/>
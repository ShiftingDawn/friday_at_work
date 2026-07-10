<script lang="ts">
    import type {HTMLButtonAttributes} from "svelte/elements";

    const {children, ...props}: HTMLButtonAttributes = $props();
</script>

<button {...props} class="bg-ctp-surface1 h-8 self-end px-4 rounded-full">
    {@render children?.()}
</button>
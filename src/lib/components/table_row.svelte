<script lang="ts">
    import type {HTMLAttributes} from "svelte/elements";

    const {children, ...props}: HTMLAttributes<HTMLElement> = $props();
</script>

<tr {...props} class="h-12 border-b border-ctp-surface1 hover:bg-ctp-surface1 transition-colors">
    {@render children?.()}
</tr>
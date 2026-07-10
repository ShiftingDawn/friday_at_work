<script lang="ts">
    import type {HTMLThAttributes} from "svelte/elements";

    const {children, ...props}: HTMLThAttributes = $props();
</script>

<th {...props} class="font-bold text-left first-of-type:pl-4 last-of-type:pr-4">
    {@render children?.()}
</th>
<script lang="ts">
    import type {HTMLTdAttributes} from "svelte/elements";

    const {children, ...props}: HTMLTdAttributes = $props();
</script>

<td {...props} class="first-of-type:pl-4 last-of-type:pr-4 m-0 p-0">
    {@render children?.()}
</td>
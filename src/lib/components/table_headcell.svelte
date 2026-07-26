<script lang="ts">
  import type {HTMLThAttributes} from "svelte/elements";
  import {twMerge} from "tailwind-merge";

  const {
    children,
    class: cls,
    ...props
  }: HTMLThAttributes & { class?: string } = $props();
</script>

<th {...props} class={twMerge("font-bold text-left px-4", cls)}>
  {@render children?.()}
</th>

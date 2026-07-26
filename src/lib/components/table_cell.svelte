<script lang="ts">
  import type {HTMLTdAttributes} from "svelte/elements";
  import {twMerge} from "tailwind-merge";

  const {
    children,
    class: cls,
    ...props
  }: HTMLTdAttributes & { class?: string } = $props();
</script>

<td {...props} class={twMerge("m-0 p-0 px-4", cls)}>
  {@render children?.()}
</td>

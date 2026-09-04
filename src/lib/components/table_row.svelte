<script lang="ts">
  import type {HTMLAttributes} from "svelte/elements";
  import {twMerge} from "tailwind-merge";

  const {
    children,
    class: cls,
    ...props
  }: HTMLAttributes<HTMLElement> = $props();
</script>

<tr {...props} class={twMerge(
  "h-12 border-b border-table-hover hover:bg-table-hover hover:text-table-hover-text transition-colors",
  cls as string
)}>
  {@render children?.()}
</tr>

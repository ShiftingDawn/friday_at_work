<script lang="ts">
  import type {HTMLSelectAttributes} from "svelte/elements";
  import {twMerge} from "tailwind-merge";

  const {
    class: cls,
    children,
    ...rest
  }: HTMLSelectAttributes = $props();
</script>

<select class={twMerge("w-full bg-select text-select-text rounded-full px-4 py-2", cls as string)} {...rest}>
  {@render children?.()}
</select>

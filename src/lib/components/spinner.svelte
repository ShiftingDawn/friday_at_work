<script lang="ts">
  import type {Snippet} from "svelte";
  import {twMerge} from "tailwind-merge";

  const {
    class: cls,
    children,
  }: {
    class?: string,
    children?: Snippet,
  } = $props();
</script>

<div class="flex flex-row items-center gap-4">
  <div class={twMerge(`
  aspect-square w-12 rounded-full animate-spin spin
  border-ctp-text border-4 border-r-ctp-red
  `, cls)}>
  </div>
  {@render children?.()}
</div>

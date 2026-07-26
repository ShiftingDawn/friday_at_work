<script lang="ts">
  import type {Snippet} from "svelte";
  import {twMerge} from "tailwind-merge";

  const {
    dir = "h",
    children,
  }: {
    dir?: "h" | "v" | "hv",
    children?: Snippet,
  } = $props();
</script>

<div class={twMerge(
  "flex w-full h-full col-span-full",
  (dir === "h" || dir === "hv") && "justify-center",
  (dir === "v" || dir === "hv") && "items-center"
)}>
  {@render children?.()}
</div>

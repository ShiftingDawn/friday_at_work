<script lang="ts">

    import type {Snippet} from "svelte";
    import {twMerge} from "tailwind-merge";

    const {
      name,
      class: cls,
      children,
    }: {
      name?: string,
      class?: string,
      children?: Snippet
    } = $props();
</script>

<div class={twMerge(
  "border-4 border-ctp-surface1 rounded-lg p-4 relative",
  cls,
  name && "mt-6 pt-6"
)}>
    {#if name}
        <div class="absolute bg-ctp-surface1 px-2 py-1 rounded-full left-4 -top-4.5">
            {name}
        </div>
    {/if}
    {@render children?.()}
</div>

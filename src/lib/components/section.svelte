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

{#if name}
  <div class={twMerge("bg-section text-section-text rounded-lg p-4", name && "flex flex-col gap-2")}>
    <div>
      <div class="m-2 mt-0 rounded-full text-lg font-bold">
        {name}
      </div>
    </div>
    <div class={cls}>
      {@render children?.()}
    </div>
  </div>
{:else}
  <div class={twMerge("bg-section text-section-text rounded-lg p-4", cls)}>
    {@render children?.()}
  </div>
{/if}

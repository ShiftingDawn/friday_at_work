<script lang="ts">
  import type {Snippet} from "svelte";
  import {fade} from "svelte/transition";
  import {twMerge} from "tailwind-merge";
  import Portal from "svelte-portal";

  const {
    open,
    onclose,
    canclose,
    title,
    class: cls,
    children,
    actions,
  }: {
    open: boolean,
    onclose: () => void,
    canclose?: boolean,
    title?: string,
    class?: string,
    children: Snippet,
    actions?: Snippet
  } = $props();
</script>

<Portal target="#modalroot">
  <div class={twMerge(
    "hidden fixed z-40 inset-0 pointer-events-none items-end pb-16 md:pb-0 md:items-center lg:items-start lg:pt-16 justify-center backdrop-blur-none transition-all",
    open && "flex pointer-events-auto"
  )}>
    {#if open}
      <button type="button" aria-label="Close dialog" onclick={onclose}
              class="absolute inset-0 backdrop-blur-xs"
              disabled={canclose === false}
      ></button>
      <div in:fade={{duration: 150,}} out:fade={{duration: 150,}}
           class={twMerge("relative min-w-xs bg-dialog text-dialog-text backdrop-blur-lg rounded-lg shadow-lg flex flex-col gap-2", cls)}
      >
        {#if title}
          <div class="text-xl font-bold uppercase bg-dialog-header text-dialog-header-text p-4 rounded-t-lg shadow-lg">
            {title}
          </div>
        {/if}
        <div class="p-4">
          {@render children()}
        </div>
        {#if actions}
          <div class="flex items-center gap-2 justify-end p-4 rounded-b-lg">
            {@render actions()}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</Portal>

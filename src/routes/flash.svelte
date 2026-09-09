<script lang="ts">
  import {flashStore} from "$lib/flash";
  import {twMerge} from "tailwind-merge";
  import {fly} from "svelte/transition";
  import type {Action} from "svelte/action";

  let heights: Record<string, number> = $state({});

  function closeFlash(id: string) {
    flashStore.update(flashes => flashes.filter(flash => flash.id !== id));
  }

  const observe: Action<HTMLElement, string> = (node, id) => {
    $effect(() => {
      const observer = new ResizeObserver(([entry,]) => {
        const size = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        heights = {
          ...heights,
          [id]: size,
        };
      });
      observer.observe(node);
      return () => {
        observer.disconnect();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {[id]: _, ...rest} = heights;
        heights = rest;
      };
    });
  };

  function getTop(i: number): number {
    const newest = $flashStore.length - 1;
    if (i === newest) return 0;
    const newer = $flashStore[i + 1];
    const newerTop = getTop(i + 1);
    const newerHeight = heights[newer.id] ?? 0;
    const height = heights[$flashStore[i].id] ?? 0;
    const desiredTop = newerTop + newerHeight + 12 - height;
    return Math.max(newerTop, desiredTop);
  }
</script>

<div
    class="fixed top-24 left-0 w-screen pointer-events-none flex justify-center z-50"
>
  <div class="relative w-xs">
    {#each $flashStore as flash, i (flash.id)}
      <div
          use:observe={flash.id}
          in:fly={{ y: -32, duration: 250, opacity: 0, delay: i * 50,}}
          out:fly={{ y: -32, duration: 200, opacity: 0, }}
          style={`position: absolute; top: ${getTop(i)}px; width: 100%; z-index: ${i + 1}; transition: top 200ms ease;`}
          class={twMerge(
            "rounded-lg shadow-lg overflow-hidden backdrop-blur-md pointer-events-auto",
            flash.type === "success" && "bg-flash-success text-flash-success-text",
            flash.type === "warning" && "bg-flash-warning text-flash-warning-text",
            flash.type === "error" && "bg-flash-error text-flash-error-text",
            flash.type === "info" && "bg-flash-info text-flash-info-text"
          )}
          role={flash.type === "error" ? "alert" : "status"}
      >
        <div class="flex flex-row justify-between pl-4 py-2">
          <div class="overflow-auto">
            {#if flash.title}
              <p><strong>{flash.title}</strong></p>
            {/if}
            <p>{flash.text}</p>
          </div>
          <button class="w-8 h-8 mr-2 shrink-0 cursor-pointer rounded-full hover:bg-black/20"
                  onclick={() => closeFlash(flash.id)}
                  aria-label="Dismiss notification" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
              <path
                  d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
        <div class="w-full bg-white h-1 animate-shrink origin-left" aria-hidden="true">
          <!-- Progress bar -->
        </div>
      </div>
    {/each}
  </div>
</div>

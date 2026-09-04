<script lang="ts">
  import {flashStore} from "$lib/flash";
  import {twMerge} from "tailwind-merge";
  import {fly} from "svelte/transition";
  import {flip} from "svelte/animate";

  function closeFlash(id: string) {
    flashStore.update(flashes => flashes.filter(flash => flash.id !== id));
  }
</script>

<div
    class="fixed top-0 left-0 w-screen h-screen pointer-events-none flex flex-col-reverse justify-start items-center gap-4 pb-4 z-50">
  {#each $flashStore as flash, i (flash.id)}
    <div
        animate:flip={{ duration: 200, }}
        in:fly={{ y: 32, duration: 250, opacity: 0, delay: i * 50,}}
        out:fly={{ y: 32, duration: 200, opacity: 0, }}
        class={twMerge(
          "w-xs rounded-lg shadow-lg overflow-hidden backdrop-blur-md",
          flash.type === "success" && "bg-success text-success-text",
          flash.type === "warning" && "bg-warning text-warning-text",
          flash.type === "error" && "bg-error text-error-text",
          flash.type === "info" && "bg-info text-info-text"
        )}
    >
      <button class="px-4 py-2 overflow-auto pointer-events-auto" onclick={() => closeFlash(flash.id)}>
        {#if flash.title}
          <p><strong>{flash.title}</strong></p>
        {/if}
        <p>{flash.text}</p>
      </button>
      <div class="w-full bg-white h-1 animate-shrink origin-left" aria-hidden="true" role="presentation">
        <!-- Progress bar -->
      </div>
    </div>
  {/each}
</div>

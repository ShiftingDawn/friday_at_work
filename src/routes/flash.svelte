<script lang="ts">
  import {flashStore} from "$lib/flash";
  import {twMerge} from "tailwind-merge";
  import {fly} from "svelte/transition";
  import {flip} from "svelte/animate";
</script>

<div class="fixed inset-0 pointer-events-none flex flex-col-reverse justify-start items-center gap-4 pb-4 z-50">
  {#each $flashStore as flash, i (flash.id)}
    <div
      animate:flip={{ duration: 200, }}
      in:fly={{ y: 32, duration: 250, opacity: 0, delay: i * 50,}}
      out:fly={{ y: 32, duration: 200, opacity: 0, }}
      class={twMerge(
        "w-xs rounded-lg shadow-lg text-base overflow-hidden",
        flash.type === "success" && "bg-success",
        flash.type === "warning" && "bg-warning",
        flash.type === "error" && "bg-error",
        flash.type === "info" && "bg-info"
      )}>
      <div class="px-4 py-2 overflow-auto">
        {#if flash.title}
          <p><strong>{flash.title}</strong></p>
        {/if}
        <p>{flash.text}</p>
      </div>
      <div class="w-full bg-white h-1 animate-shrink origin-left" aria-hidden="true" role="presentation">

      </div>
    </div>
  {/each}
</div>

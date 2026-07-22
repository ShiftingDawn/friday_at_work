<script lang="ts">
  import {flashStore} from "$lib/flash";
  import {twMerge} from "tailwind-merge";
  import {fly} from "svelte/transition";
  import {flip} from "svelte/animate";
</script>

<div class="fixed inset-0 pointer-events-none flex flex-col-reverse justify-start items-center gap-4 pb-4">
  {#each $flashStore as flash, i (flash.id)}
    <div
      animate:flip={{ duration: 200, }}
      in:fly={{ y: 32, duration: 250, opacity: 0, delay: i * 50,}}
      out:fly={{ y: 32, duration: 200, opacity: 0, }}
      class={twMerge(
        "w-xs px-4 py-2 rounded-lg shadow-lg text-ctp-base",
        flash.type === "success" && "bg-ctp-green",
        flash.type === "warning" && "bg-ctp-yellow",
        flash.type === "error" && "bg-ctp-red",
        flash.type === "info" && "bg-ctp-blue"
      )}>
      {#if flash.title}
        <p><strong>{flash.title}</strong></p>
      {/if}
      <p>{flash.text}</p>
    </div>
  {/each}
</div>

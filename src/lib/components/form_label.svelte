<script lang="ts">
  import type {Snippet} from "svelte";
  import {twMerge} from "tailwind-merge";
  import type {RemoteFormIssue} from "@sveltejs/kit";

  const {
    name,
    class: cls,
    error,
    children,
  }: {
    name: string,
    class?: string,
    error?: string | string[] | boolean | RemoteFormIssue[],
    children: Snippet
  } = $props();
</script>

<label class={twMerge(
  "flex flex-col bg-ctp-overlay2 rounded-2xl group/formcontrol",
  error && "bg-ctp-red",
  cls
)} data-invalid={Boolean(error)}>
  <span class="pl-4 pr-2 text-ctp-base font-bold">{name}</span>
  <span class="p-1">
        {@render children()}
    </span>
  {#if typeof error === "string"}
    <p class="px-4 text-ctp-base">{error}</p>
  {:else if Array.isArray(error)}
    {#each error as err, i (i)}
      {#if typeof err === "string"}
        <p class="px-4 text-ctp-base">{err}</p>
      {:else}
        <p class="px-4 text-ctp-base">{err.message}</p>
      {/if}
    {/each}
  {/if}
</label>

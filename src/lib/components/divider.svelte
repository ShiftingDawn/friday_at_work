<script lang="ts">
  import type {Snippet} from "svelte";
  import {twMerge} from "tailwind-merge";

  let props: { class?: string; children?: Snippet } = $props();
</script>

<div
    role="separator"
    class={twMerge(
      "flex before:w-full before:self-center before:border-b before:border-divider after:w-full after:self-center after:border-b after:border-divider",
      props.class
    )}
>
  <div class="rounded-2xl bg-divider px-2 text-nowrap text-divider-text">
    {@render props.children?.()}
  </div>
</div>

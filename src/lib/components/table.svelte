<script lang="ts">
  import type {HTMLTableAttributes} from "svelte/elements";
  import {twMerge} from "tailwind-merge";
  import type {Snippet} from "svelte";
  import Center from "./center.svelte";

  const {
    children,
    class: cls,
    paginate,
    ...rest
  }: HTMLTableAttributes & { paginate?: Snippet } = $props();
</script>

<div class="w-full overflow-auto">
  {#if paginate}
    <Center>
      {@render paginate()}
    </Center>
  {/if}
  <table class={twMerge("w-full", cls as string)} {...rest}>
    {@render children?.()}
  </table>
  {#if paginate}
    <Center>
      {@render paginate()}
    </Center>
  {/if}
</div>

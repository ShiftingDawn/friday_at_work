<script lang="ts">
  import type {HTMLTableAttributes} from "svelte/elements";
  import {twMerge} from "tailwind-merge";

  const {children, class: cls, ...rest}: HTMLTableAttributes = $props();
</script>

<div class="w-full overflow-auto">
  <table class={twMerge("w-full", cls as string)} {...rest}>
    {@render children?.()}
  </table>
</div>

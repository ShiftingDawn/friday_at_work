<script lang="ts">
  import type {HTMLInputAttributes} from "svelte/elements";
  import {twMerge} from "tailwind-merge";

  let {
    class: cls,
    disabled,
    value = $bindable(),
    ...props
  }: HTMLInputAttributes = $props();
</script>

<input {...props} disabled={disabled} bind:value={value}
       class={twMerge(
         "w-full bg-input text-input-text h-8 rounded-full px-4 py-2",
         disabled && "cursor-not-allowed",
         cls as never
       )}
/>

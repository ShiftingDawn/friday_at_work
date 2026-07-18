<script lang="ts">
  import type {Snippet} from "svelte";

  const {
    children,
    name,
    checked,
  }: {
    children: Snippet,
    name: string,
    checked: HTMLInputElement["checked"]
  } = $props();
</script>

<label class="flex items-center gap-4">
    <input type="checkbox" {name} {checked} class={`
                appearance-none w-8 h-8 bg-ctp-surface0 rounded-lg border-2 border-ctp-surface2
                checked:bg-ctp-lavender checked:border-ctp-lavender peer
    `}/>
    <svg class="absolute w-8 h-8 mt-1 hidden peer-checked:block"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 24 24"
         fill="none"
         stroke="var(--color-ctp-base)"
         stroke-width="4"
         stroke-linecap="round"
         stroke-linejoin="round"
    >
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    {@render children?.()}
</label>

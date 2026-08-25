<script lang="ts">
  import type {Snippet} from "svelte";

  const {
    children,
    name,
    value,
  }: {
    children: Snippet,
    name: string,
    value?: string,
  } = $props();
</script>

<label class={`
    flex flex-col gap-2 relative rounded-[50px] p-2 bg-surface1 overflow-hidden
    items-center justify-center hover:bg-primary hover:text-text-alt
    has-checked:bg-secondary has-checked:rounded-xl transition-all
    has-checked:text-text-alt cursor-pointer has-checked:cursor-default
`}>
  <input type="radio" name={name} value={value} class="appearance-none absolute"/>
  {@render children?.()}
</label>

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
    flex flex-col gap-2 relative rounded-[50px] p-2 bg-button text-button-text overflow-hidden transition-all
    items-center justify-center hover:bg-button-hover hover:text-button-hover-text hover:rounded-xl
    has-checked:bg-button-active has-checked:rounded-xl has-checked:text-button-active-text
    cursor-pointer has-checked:cursor-default
`}>
  <input type="radio" name={name} value={value} class="appearance-none absolute"/>
  {@render children?.()}
</label>

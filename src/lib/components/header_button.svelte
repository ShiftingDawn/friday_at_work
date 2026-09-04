<script lang="ts">
  import {page} from "$app/state";
  import {twMerge} from "tailwind-merge";
  import type {Snippet} from "svelte";
  import type {ResolvedPathname} from "$app/types";

  let {
    name,
    children,
    href,
    "data-sveltekit-reload": doReload,
  }: {
    name: string,
    children: Snippet,
    href: ResolvedPathname,
    "data-sveltekit-reload"?: boolean
  } = $props();

  let active = $derived(href === "/"
    ? page.url.pathname === "/"
    : page.url.pathname.indexOf(href) === 0
  );
</script>

<a href={href} class={twMerge(
  "bg-button text-button-text rounded-[50px] px-4 py-2 flex items-center gap-2 min-w-fit transition-all hover:rounded-lg",
  !active && "hover:bg-button-hover hover:text-button-hover-text",
  active && "bg-button-active rounded-lg hover:cursor-default"
)} data-sveltekit-reload={doReload}>
  <div class="w-8 h-8">
    {@render children()}
  </div>
  <span class="font-bold">{name}</span>
</a>

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
  "text-ctp-text bg-ctp-surface0 rounded-[50px] px-4 py-2 flex items-center gap-2 min-w-fit transition-all hover:bg-ctp-lavender hover:text-ctp-crust",
  active && "bg-ctp-rosewater text-ctp-crust rounded-lg hover:cursor-default hover:bg-ctp-rosewater"
)} data-sveltekit-reload={doReload}>
    <div class="w-8 h-8">
        {@render children()}
    </div>
    <span class="font-bold">{name}</span>
</a>

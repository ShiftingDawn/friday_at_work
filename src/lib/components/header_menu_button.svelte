<script lang="ts">
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
</script>

<li>
  <a href={href} class="flex items-center gap-4 px-4 py-2 first:pt-4 last:pb-4 hover:bg-ctp-lavender hover:text-ctp-crust" data-sveltekit-reload={doReload}>
    <div class="w-8 h-8">
      {@render children()}
    </div>
    <span class="font-bold">{name}</span>
  </a>
</li>

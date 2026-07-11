<script lang="ts">
    import {page} from "$app/state";
    import {twMerge} from "tailwind-merge";
    import type {Snippet} from "svelte";

    let {name, children, href}: { name: string, children: Snippet, href: string, } = $props();

    let active = $derived(href === "/"
        ? page.url.pathname === "/"
        : page.url.pathname.indexOf(href) === 0
    );
</script>

<a href={href} class={twMerge(
    "text-ctp-text bg-ctp-surface0 rounded-[50px] px-4 py-2 flex items-center gap-2 min-w-fit transition-all hover:bg-ctp-overlay0",
    active && "bg-ctp-lavender text-ctp-base rounded-lg hover:cursor-default hover:bg-ctp-lavender",
)}>
    <div class="w-8 h-8">
        {@render children()}
    </div>
    <span class="font-bold">{name}</span>
</a>
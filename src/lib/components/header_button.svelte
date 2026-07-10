<script lang="ts">
    import type {Snippet} from "svelte";

    let {
        children,
        href
    }: {
        children: Snippet,
        href: string,
    } = $props();
</script>

<a href={href} class="bg-ctp-surface0 rounded-full p-2">
    {@render children()}
</a>
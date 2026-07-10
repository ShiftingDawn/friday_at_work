<script lang="ts">
    import type {Snippet} from "svelte";
    import type {HTMLInputAttributes} from "svelte/elements";

    const props: HTMLInputAttributes = $props();
</script>

<input {...props} class="bg-ctp-surface1 h-8 rounded-full px-4 py-2"/>
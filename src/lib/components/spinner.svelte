<script lang="ts">
    import {twMerge} from "tailwind-merge";

    const {class: cls,}: { class?: string } = $props();
</script>

<div class={twMerge("aspect-square w-16 rounded-full animate-spin spin border-ctp-text border-4 border-r-transparent", cls)}>
</div>

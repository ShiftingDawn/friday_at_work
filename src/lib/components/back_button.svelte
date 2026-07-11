<script lang="ts">
    import IconBack from "$lib/icon/back.svelte";

    const {href}: { href: string } = $props();
</script>

<a class="flex items-center hover:bg-ctp-lavender hover:text-ctp-crust rounded-lg transition-all" href={href}>
    <div class="w-8 h-8">
        <IconBack/>
    </div>
</a>
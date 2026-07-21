<script lang="ts">
  import type {ResolvedPathname} from "$app/types";
  import IconBack from "$icon/back.svelte";

  const {href,}: { href: ResolvedPathname } = $props();
</script>

<a class="flex items-center hover:bg-ctp-lavender hover:text-ctp-crust rounded-lg transition-all"
   href={href}>
    <div class="w-8 h-8">
        <IconBack/>
    </div>
</a>

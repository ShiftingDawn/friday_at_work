<script lang="ts">
  import type {ResolvedPathname} from "$app/types";
  import IconBack from "$icon/back.svelte";

  const {href,}: { href: ResolvedPathname } = $props();
</script>

<a class="flex items-center hover:bg-button-hover hover:text-button-hover-text rounded-lg transition-all"
   href={href}>
  <div class="w-12 h-12">
    <IconBack/>
  </div>
</a>

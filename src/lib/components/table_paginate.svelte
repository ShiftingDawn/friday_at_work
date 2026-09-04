<script lang="ts">
  import IconButton from "./icon_button.svelte";
  import BackIcon from "$icon/back.svelte";

  let {
    total,
    size,
    onchange,
  }: {
    total: number;
    size: number,
    onchange: (from: number, take: number) => void;
  } = $props();

  let page = $state(0);

  function getTotalPages() {
    return Math.ceil(total / size);
  }

  function hasPage(newPage: number) {
    return newPage >= 0 && newPage <= getTotalPages() - 1;
  }

  function toPage(newPage: number) {
    if (!hasPage(newPage)) return;
    page = newPage;
    const start = newPage * size;
    onchange(start, Math.min(size, total - start));
  }
</script>

<div class="flex gap-4 items-center bg-surface2 rounded-full my-2">
  <IconButton onclick={() => toPage(page - 1)} disabled={!hasPage(page - 1)}>
    <BackIcon/>
  </IconButton>
  <div>
    Page {page + 1} of {getTotalPages()} ({page * size + 1} - {Math.min(total, (page + 1) * size)}
    of {total})
  </div>
  <IconButton onclick={() => toPage(page + 1)} class="rotate-180" disabled={!hasPage(page + 1)}>
    <BackIcon/>
  </IconButton>
</div>

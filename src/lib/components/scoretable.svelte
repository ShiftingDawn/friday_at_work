<script lang="ts">

    interface Row {
      id: string;
      label: string;
      amount: number;
    }

    const {rows,}: { rows: Row[] } = $props();
</script>

<div
    class="grid gap-4 text-ctp-crust"
    style="grid-template-columns: auto 1fr;"
>
  <div class="grid gap-4">
    {#each rows as record(`score_${record.id}`)}
      <div class="bg-ctp-lavender px-4 py-2 rounded-lg">
        {record.amount}
      </div>
    {/each}
  </div>
  <div
      class="grid gap-4"
      style="grid-template-columns: repeat({rows[0].amount}, 1fr);"
  >
    {#each rows as record(`bar_${record.id}`)}
      <div
          class="bg-ctp-lavender px-4 py-2 rounded-lg"
          style="grid-column: {record.amount} span / {record.amount} span"
      >
        {record.label}
      </div>
    {/each}
  </div>
</div>

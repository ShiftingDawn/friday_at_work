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
      <div class="bg-ctp-lavender p-2 rounded-lg text-center min-w-10">
        {record.amount}
      </div>
    {/each}
  </div>

  <div class="overflow-x-auto min-w-0">
    <div
        class="grid gap-4 h-full"
        style="grid-template-columns: repeat({rows[0].amount}, 1fr);"
    >
      {#each rows as record(`bar_${record.id}`)}
        <div
            class="bg-ctp-lavender rounded-lg min-w-0 flex items-center pl-2 truncate"
            style="grid-column: {record.amount} span / {record.amount} span"
        >
          {record.label}
        </div>
        {#if record.amount < rows[0].amount}
          <div style="grid-column: {rows[0].amount - record.amount} span / {rows[0].amount - record.amount} span"
               aria-hidden="true" role="presentation"
          ></div>
        {/if}
      {/each}
    </div>
  </div>
</div>

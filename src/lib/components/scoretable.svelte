<script lang="ts">
    import {onMount} from "svelte";
    import {Chart} from "chart.js/auto";
    import {useOldBarStyle} from "$lib/preferences";
    import {get} from "svelte/store";

    interface Row {
      id: string;
      label: string;
      amount: number;
    }

    const {id, rows,}: { id: string, rows: Row[] } = $props();

    onMount(() => {
      if (get(useOldBarStyle)) return;
      const ctx = document.getElementById(`${id}canvas`) as HTMLCanvasElement;
      const barColor = window.getComputedStyle(ctx).getPropertyValue("--color-primary");
      const chart = new Chart(ctx, {
        type: "bar",
        options: {
          maintainAspectRatio: false,
          indexAxis: "y",
          plugins: {legend: {display: false,},},
          // @ts-expect-error scale does not exist, but it does tho
          scale: {ticks: {precision: 0,},},
        },
        data: {
          labels: rows.map(row => row.label),
          datasets: [
            {
              data: rows.map(row => row.amount),
              backgroundColor: barColor,
              borderSkipped: false,
              borderRadius: 8,
              barThickness: 32,
            },
          ],
        },
      });
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        chart.data.datasets[0].backgroundColor = window.getComputedStyle(ctx).getPropertyValue("--color-primary");
      });
    });
</script>

{#if $useOldBarStyle}
  <div
      class="grid gap-4 text-text-alt"
      style="grid-template-columns: auto 1fr;"
  >
    <div class="grid gap-4">
      {#each rows as record(`score_${record.id}`)}
        <div class="bg-primary p-2 rounded-lg text-center min-w-10">
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
              class="bg-primary rounded-lg min-w-0 flex items-center pl-2 truncate"
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
{:else}
  <div class="full" style={`height: ${rows.length * 64 + 32}px`}>
    <canvas id={`${id}canvas`}></canvas>
  </div>
{/if}

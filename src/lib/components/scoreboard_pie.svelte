<script lang="ts">
  import {onMount} from "svelte";
  import {Chart} from "chart.js/auto";
  import {isDarkMode, listenToThemeChanges} from "$lib/client";

  interface Row {
    id: string;
    label: string;
    amount: number;
  }

  const {
    id,
    rows,
  }: {
    id: string,
    rows: Row[],
  } = $props();

  onMount(() => {
    const ctx = document.getElementById(id) as HTMLCanvasElement;

    function getColorText() {
      return window.getComputedStyle(document.documentElement).getPropertyValue("--color-text");
    }

    function makeColors() {
      const dark = isDarkMode();
      return [
        dark ? "#342d64" : "#a19ad1",
        dark ? "#1e66f5" : "#8fc2df",
        dark ? "#40a02b" : "#c2e0ae",
        dark ? "#d20f39" : "#efefa8",
        dark ? "#ea76cb" : "#edcb9c",
        dark ? "#8839ef" : "#d99ca5",
      ];
    }

    const chart = new Chart(ctx, {
      type: "pie",
      options: {plugins: {legend: {position: "bottom",},},},
      data: {
        labels: rows.map(row => row.label),
        datasets: [
          {
            data: rows.map(row => row.amount),
            borderWidth: 0,
            backgroundColor: makeColors(),
          },
        ],
      },
    });
    const unsub = listenToThemeChanges(() => {
      chart.data.datasets[0].backgroundColor = makeColors();
      chart.options.plugins!.legend!.labels!.color = getColorText();
      chart.update();
    });
    return () => unsub();
  });
</script>

<div class="w-full max-w-sm">
  <canvas id={id} width="100%" height="100%"></canvas>
</div>

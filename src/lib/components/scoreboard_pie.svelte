<script lang="ts">
    import {onMount} from "svelte";
    import {Chart} from "chart.js/auto";

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
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

      function makeColors() {
        const dark = isDarkMode.matches;
        return [
          window.getComputedStyle(ctx).getPropertyValue("--color-primary"),
          window.getComputedStyle(ctx).getPropertyValue("--color-secondary"),
          dark ? "#f38ba8" : "#d20f39",
          dark ? "#fab387" : "#fe640b",
          dark ? "#f9e2af" : "#df8e1d",
          dark ? "#f5e0dc" : "#dc8a78",
          dark ? "#a6e3a1" : "#40a02b",
          dark ? "#89dceb" : "#179299",
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
      isDarkMode.addEventListener("change", () => {
        chart.data.datasets[0].backgroundColor = makeColors();
      });
    });
</script>

<div class="w-full max-w-sm">
  <canvas id={id} width="100%" height="100%"></canvas>
</div>

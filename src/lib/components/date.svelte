<script lang="ts">
  const {
    value,
     fallback
  }: {
    value: Date | undefined, fallback?: string
  } = $props();
 
  function displayDate<T extends Date | undefined>(date: T): T extends Date ? string : undefined {
    const str = date?.toLocaleDateString("en-US", {dateStyle: "long",}) as T extends Date ? string : undefined;
    if (typeof localStorage !== "undefined" && "showtime" in localStorage && date) {
      return `${str} at ${date.toLocaleString("nl-NL", {timeStyle: "short",})}` as T extends Date ? string : undefined;
    }
    return str;
  }

  let txt = $derived(displayDate(value));

  $effect.pre(() => {
    txt = displayDate(value);
  });
</script>

<span>{txt ?? fallback}</span>
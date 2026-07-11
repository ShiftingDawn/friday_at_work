<script lang="ts">
    import type {Snippet} from "svelte";

    const {children, name, value}: { children: Snippet, name: string, value: any } = $props();
</script>

<label class="flex flex-col gap-2 relative rounded-[50px] p-2 bg-ctp-surface1 items-center justify-center hover:bg-ctp-lavender hover:text-ctp-crust has-checked:bg-ctp-rosewater has-checked:rounded-xl transition-all has-checked:text-ctp-crust cursor-pointer has-checked:cursor-default">
    <input type="radio" name={name} value={value} class="appearance-none absolute"/>
    {@render children?.()}
</label>
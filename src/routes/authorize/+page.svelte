<script lang="ts">
    import IconButton from "$lib/components/icon_button.svelte";
    import IconBack from "$lib/icon/back.svelte";
    import IconCheck from "$lib/icon/check.svelte";

    function addNumber(num: number) {
        if (num >= 0) {
            pincode = pincode + num.toString();
        } else {
            pincode = pincode.substring(0, pincode.length - 2);
        }
    }

    let pincode = $state("");
</script>

<div class="flex justify-center w-full">
    <div class="grid grid-cols-3 gap-2 w-fit">
        <div class="col-span-3 w-full h-12 bg-ctp-surface0 rounded-xl flex items-center px-4">
            {Array(pincode.length).fill("\u25cf").join("")}
        </div>
        <IconButton onclick={() => addNumber(1)}>1</IconButton>
        <IconButton onclick={() => addNumber(2)}>2</IconButton>
        <IconButton onclick={() => addNumber(3)}>3</IconButton>
        <IconButton onclick={() => addNumber(4)}>4</IconButton>
        <IconButton onclick={() => addNumber(5)}>5</IconButton>
        <IconButton onclick={() => addNumber(6)}>6</IconButton>
        <IconButton onclick={() => addNumber(7)}>7</IconButton>
        <IconButton onclick={() => addNumber(8)}>8</IconButton>
        <IconButton onclick={() => addNumber(9)}>9</IconButton>
        {#if pincode.length !== 0}
            <IconButton onclick={() => addNumber(-1)} class="bg-transparent">
                <IconBack/>
            </IconButton>
        {:else}
            <div/>
        {/if}
        <IconButton onclick={() => addNumber(0)}>0</IconButton>
        {#if pincode.length !== 0}
            <form method="POST">
                <input type="hidden" name="pincode" value={pincode}/>
                <IconButton type="submit" class="bg-transparent">
                    <IconCheck/>
                </IconButton>
            </form>
        {/if}
    </div>
</div>

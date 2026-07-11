<script lang="ts">
    import type {PageProps} from './$types';
    import Card from "$lib/components/card.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import IconButton from "$lib/components/icon_button.svelte";
    import Section from '$lib/components/section.svelte';
    import BackButton from '$lib/components/back_button.svelte';
    import Button from '$lib/components/button.svelte';
    import IconHide from "$lib/icon/hide.svelte";
    import IconShow from "$lib/icon/show.svelte";

    const {data}: PageProps = $props();
</script>

<Card title={data.drink!.name}>
    {#snippet back()}
        <BackButton href="/drinks"/>
    {/snippet}
    {#snippet action()}
        <form method="POST" action="?/hide">
            <IconButton type="submit">
                {#if data.drink!.hidden}
                    <IconShow/>
                {:else}
                    <IconHide/>
                {/if}
            </IconButton>
        </form>
    {/snippet}
    <Section name="Update data">
        <form method="POST" action="?/update" class="flex flex-col sm:flex-row gap-4">
            <FormLabel name="Name">
                <FormInput type="text" min="3" name="name" value={data.drink!.name}/>
            </FormLabel>
            <FormLabel name="Price">
                <FormInput type="number" min="0" name="price" value={data.drink!.price}/>
            </FormLabel>
            <Button type="submit" class="self-start">
                Save
            </Button>
        </form>
    </Section>
    <Section name="Update image">
        <div class="flex items-end">
            {#if data.drink!.image}
                <img src={data.drink!.image} class="w-64 aspect-square"/>
            {/if}
            <form method="POST" action="?/reskin" enctype="multipart/form-data" class="flex flex-col gap-4 mt-4">
                <FormInput type="file" name="image" class="p-0 file:h-8 file:bg-ctp-surface2 file:px-2 file:mr-2"/>
                <Button type="submit" class="self-start">
                    Save
                </Button>
            </form>
        </div>
    </Section>
</Card>
<script lang="ts">
    import type {PageProps} from './$types';
    import Card from "$lib/components/card.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import FormButton from "$lib/components/form_button.svelte";
    import Section from '$lib/components/section.svelte';

    const {data}: PageProps = $props();
</script>

<Card>
    {#snippet name()}
        {data.name}
    {/snippet}
    {#snippet action()}
        <form method="POST" action="?/hide">
            <FormButton type="submit">
                {#if data.hidden}
                    Unhide drink
                {:else}
                    Hide drink
                {/if}
            </FormButton>
        </form>
    {/snippet}
    <Section name="Update data">
        <form method="POST" action="?/update" class="flex flex-col sm:flex-row gap-4">
            <FormLabel name="Name">
                <FormInput type="text" min="3" name="name" value={data.name}/>
            </FormLabel>
            <FormLabel name="Price">
                <FormInput type="number" min="0" name="price" value={data.price}/>
            </FormLabel>
            <FormButton type="submit" class="self-start">
                Save
            </FormButton>
        </form>
    </Section>
    <Section name="Update image">
        <div class="flex items-end">
            {#if data.image}
                <img src={data.image} class="w-64 aspect-square"/>
            {/if}
            <form method="POST" action="?/reskin" enctype="multipart/form-data" class="flex flex-col gap-4 mt-4">
                <FormInput type="file" name="image" class="p-0 file:h-8 file:bg-ctp-surface2 file:px-2 file:mr-2"/>
                <FormButton type="submit" class="self-start">
                    Save
                </FormButton>
            </form>
        </div>
    </Section>
</Card>
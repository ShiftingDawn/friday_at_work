<script lang="ts">
    import type {PageProps} from './$types';
    import {enhance} from "$app/forms";
    import Card from "$lib/components/card.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import IconButton from "$lib/components/icon_button.svelte";
    import Section from '$lib/components/section.svelte';
    import Spinner from '$lib/components/spinner.svelte';
    import BackButton from '$lib/components/back_button.svelte';
    import Button from '$lib/components/button.svelte';
    import IconHide from "$lib/icon/hide.svelte";
    import IconShow from "$lib/icon/show.svelte";
    import IconRestock from "$lib/icon/plus.svelte";
    import Modal from "$lib/components/modal.svelte";
    import DrinkImage from "$lib/components/drink_image.svelte";
    import {displayPrice} from "$lib";

    const {params, data}: PageProps = $props();
    let modalOpen = $state(false);
    let updateDataFormLoading = $state(false);
    let reskinFormLoading = $state(false);
</script>

<form method="POST" action="?/restock">
    <Modal title="Register restock" open={modalOpen} onclose={() => modalOpen = false}>
        <FormLabel name="Amount">
            <FormInput
                    type="number"
                    min="1"
                    name="amount"
                    required
                    autofocus
            />
        </FormLabel>
        {#snippet actions()}
            <Button type="submit" class="font-bold uppercase">
                Restock
            </Button>
        {/snippet}
    </Modal>
</form>

<Card title={data.drink!.name}>
    {#snippet back()}
        <BackButton href="/drinks"/>
    {/snippet}
    {#snippet action()}
        {#if data.canWrite}
            <IconButton onclick={() => modalOpen = true}>
                <IconRestock/>
            </IconButton>
            <form method="POST" action="?/hide">
                <IconButton type="submit">
                    {#if data.drink!.hidden}
                        <IconShow/>
                    {:else}
                        <IconHide/>
                    {/if}
                </IconButton>
            </form>
        {/if}
    {/snippet}
    <Section name="Stock" class="flex flex-col gap-2">
        <p>Current stock: {data.stock}</p>
        <p>Last restock: {data.last_restock?.timestamp?.toLocaleString() ?? "never"}</p>
        <Button as="a" href={`/drinks/${params.drink}/restocks`}>Restock history</Button>
    </Section>
    {#if data.canWrite}
        <Section name="Update data">
            <form method="POST" action="?/update" class="flex flex-col max-w-md gap-4"
                  use:enhance={() => {
                      updateDataFormLoading = true;
                      return async ({update}) => {
                          await update({reset: false});
                          updateDataFormLoading = false;
                      };
                  }}
            >
                <FormLabel name="Name">
                    <FormInput type="text" min="3" name="name" disabled={updateDataFormLoading}
                               value={data.drink!.name}/>
                </FormLabel>
                <FormLabel name="Price">
                    <FormInput type="number" min="0" name="price" disabled={updateDataFormLoading}
                               value={data.drink!.price}/>
                </FormLabel>
                <Button type="submit" class="w-full" loading={updateDataFormLoading}>
                    Save
                </Button>
            </form>
        </Section>
        <Section name="Update image">
            <div class="flex flex-col md:flex-row items-center gap-4">
                <div class="relative">
                    <DrinkImage file={data.drink!.id} class="w-64" id="drinkimage"/>
                    {#if reskinFormLoading}
                        <div class="absolute inset-0 bg-ctp-crust/50 backdrop-blur-xs flex items-center justify-center">
                            <Spinner/>
                        </div>
                    {/if}
                </div>
                <form method="POST" action="?/reskin" enctype="multipart/form-data" class="flex flex-col gap-4 mt-4"
                      use:enhance={() => {
                          reskinFormLoading = true;
                          return async ({update}) => {
                            await update();
                            reskinFormLoading = false;
                          };
                      }}
                >
                    <FormInput type="file" name="image" class="p-0 file:h-8 file:bg-ctp-surface2 file:px-2 file:mr-2"
                               disabled={reskinFormLoading}/>
                    <Button type="submit" class="self-start" disabled={reskinFormLoading}>
                        Save
                    </Button>
                </form>
            </div>
        </Section>
    {:else}
        <Section name="Data">
            <p>Name: {data.drink!.name}</p>
            <p>Price: {displayPrice(data.drink!.price)}</p>
        </Section>
        <Section name="Image">
            <div class="flex items-end">
                <DrinkImage file={data.drink!.id} class="w-64"/>
            </div>
        </Section>
    {/if}
</Card>
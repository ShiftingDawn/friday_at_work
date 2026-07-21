<script lang="ts">
  import type {PageProps} from "./$types";
  import {enhance} from "$app/forms";
  import Card from "$comp/card.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import FormInput from "$comp/form_input.svelte";
  import Section from "$comp/section.svelte";
  import Spinner from "$comp/spinner.svelte";
  import BackButton from "$comp/back_button.svelte";
  import Button from "$comp/button.svelte";
  import FormCheckbox from "$comp/form_checkbox.svelte";
  import Modal from "$comp/modal.svelte";
  import DrinkImage from "$comp/drink_image.svelte";
  import {displayPrice} from "$lib";
  import type {ChangeEventHandler} from "svelte/elements";

  const {params, data,}: PageProps = $props();
  let modalOpen = $state(false);
  let updateDataFormLoading = $state(false);
  let reskinFormLoading = $state(false);

  const onCorrectionCheckChanged: ChangeEventHandler<HTMLInputElement> = e => {
    const input: HTMLInputElement = document.querySelector("#restockamountfield")!;
    if (e.currentTarget.checked) {
      input.removeAttribute("min");
    } else {
      input.setAttribute("min", "1");
    }
  };
</script>

<form method="POST" action="?/restock">
  <Modal title="Register restock" open={modalOpen} onclose={() => modalOpen = false} class="max-w-md">
    <div class="flex flex-col gap-4">
      <FormLabel name="Amount">
        <FormInput
          id="restockamountfield"
          type="number"
          min="1"
          name="amount"
          required
          autofocus
        />
      </FormLabel>
      <FormCheckbox name="correction" onchange={onCorrectionCheckChanged}>
        Restock is correction
      </FormCheckbox>
      <p>If restock correction is enabled, negative amounts can be entered to shrink the available stock.</p>
    </div>
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
  {#if data.canWrite}
    <Section name="Update data">
      <div class="flex flex-col gap-4 md:grid grid-cols-2">
        <form method="POST" action="?/update" class="flex flex-col max-w-md gap-4"
              use:enhance={() => {
                updateDataFormLoading = true;
                return async ({update,}) => {
                  await update({reset: false,});
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
        <form method="POST" action="?/hide">
          <Button type="submit">
            {#if data.drink!.hidden}
              Unhide
            {:else}
              Hide
            {/if}
          </Button>
        </form>
      </div>
    </Section>
  {:else}
    <Section name="Data">
      <p>Name: {data.drink!.name}</p>
      <p>Price: {displayPrice(data.drink!.price)}</p>
    </Section>
  {/if}
  <Section name="Stock" class="flex flex-col gap-2">
    <p>Current stock: {data.stock}</p>
    <p>Last restock: {data.last_restock?.timestamp?.toLocaleString() ?? "never"}</p>
    <div class="max-w-md grid grid-cols-2 gap-4">
      <Button as="a" href={`/drinks/${params.drink}/restocks`}>Restock history</Button>
      {#if data.canWrite}
        <Button onclick={() => modalOpen = true}>
          Add Restock
        </Button>
      {/if}
    </div>
  </Section>
  {#if data.canWrite}
    <Section name="Update image">
      <div class="flex flex-col md:flex-row items-center gap-4">
        <div class="relative">
          <DrinkImage file={data.drink!.id} class="w-64" id="drinkimage"
                      lastModified={data.drink!.modifiedAt}/>
          {#if reskinFormLoading}
            <div class="absolute inset-0 bg-ctp-crust/50 backdrop-blur-xs flex items-center justify-center">
              <Spinner/>
            </div>
          {/if}
        </div>
        <form method="POST" action="?/reskin" enctype="multipart/form-data" class="flex flex-col gap-4 mt-4"
              use:enhance={() => {
                reskinFormLoading = true;
                return async ({update,}) => {
                  await update();
                  reskinFormLoading = false;
                };
              }}>
          <FormInput type="file" name="image" class="p-0 file:h-8 file:bg-ctp-surface2 file:px-2 file:mr-2"
                     disabled={reskinFormLoading}/>
          <Button type="submit" class="self-start" disabled={reskinFormLoading}>
            Save
          </Button>
        </form>
      </div>
    </Section>
  {:else}
    <Section name="Image">
      <div class="flex items-end">
        <DrinkImage file={data.drink!.id} lastModified={data.drink!.modifiedAt} class="w-64"/>
      </div>
    </Section>
  {/if}
</Card>

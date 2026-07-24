<script lang="ts">
  import type {PageProps} from "./$types";
  import {page} from "$app/state";
  import Card from "$comp/card.svelte";
  import Section from "$comp/section.svelte";
  import Modal from "$comp/modal.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import FormInput from "$comp/form_input.svelte";
  import Button from "$comp/button.svelte";
  import DrinkImage from "$comp/drink_image.svelte";
  import IconButton from "$comp/icon_button.svelte";
  import IconCreate from "$icon/plus.svelte";
  import IconHide from "$icon/hide.svelte";
  import IconShow from "$icon/show.svelte";
  import {addDrink, getHiddenDrinks, getVisibleDrinks} from "$lib/functions/drinks.remote";
  import {flash} from "$lib/flash";
  import Spinner from "$comp/spinner.svelte";

  const {data,}: PageProps = $props();
  const showHidden = $derived(new URLSearchParams(page.url.search).has("hidden", "true"));
  let modalOpen = $state(false);
  let newDrinkFormLoading = $state(false);
</script>

<form {...addDrink.enhance(async form => {
  newDrinkFormLoading = true;
  try {
    flash("info", "Registering drink...");
    if (await form.submit()) {
      flash("success", "Drink registered successfully");
    } else {
      flash("error", "Could not register drink");
    }
  } catch {
    flash("error", "Could not register drink", "An unknown error occurred");
  }
  newDrinkFormLoading = false;
  modalOpen = false;
})} enctype="multipart/form-data">
  <Modal title="Register new drink" open={modalOpen} onclose={() => modalOpen = false}
         canclose={!newDrinkFormLoading}>
    <div class="flex flex-col gap-4">
      <FormLabel name="Name" error={addDrink.fields.name.issues()}>
        <FormInput {...addDrink.fields.name.as("text")} required min="3" disabled={newDrinkFormLoading}/>
      </FormLabel>
      <FormLabel name="Price" error={addDrink.fields.price.issues()}>
        <FormInput {...addDrink.fields.price.as("number")} required min="0" disabled={newDrinkFormLoading}/>
      </FormLabel>
      <FormLabel name="Image" error={addDrink.fields.image.issues()}>
        <FormInput {...addDrink.fields.image.as("file")} class="p-0 file:h-8 file:bg-ctp-surface2 file:px-2 file:mr-2"
                   disabled={newDrinkFormLoading}/>
      </FormLabel>
    </div>
    {#snippet actions()}
      <Button type="submit" class="font-bold uppercase" loading={newDrinkFormLoading}>
        Add
      </Button>
    {/snippet}
  </Modal>
</form>
<Card title="Manage drinks">
  {#snippet action()}
    {#if !showHidden}
      <IconButton as="a" href="/drinks?hidden=true">
        <IconHide/>
      </IconButton>
    {:else}
      <IconButton as="a" href="/drinks?hidden=false">
        <IconShow/>
      </IconButton>
    {/if}
    {#if data.canWrite}
      <IconButton onclick={() => modalOpen = true}>
        <IconCreate/>
      </IconButton>
    {/if}
  {/snippet}
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <svelte:boundary>
      {#snippet pending()}
        <Spinner>Loading drinks</Spinner>
      {/snippet}
      {#each await getVisibleDrinks() as drink(drink.id)}
        <Card as="a" href={`/drinks/${drink.id}`} class="bg-ctp-surface1 shadow-none">
          <div class="font-bold text-center text-2xl">{drink.name}</div>
          <div class="w-full py-8 px-4 aspect-square flex items-center justify-center">
            <DrinkImage file={drink.id} class="min-w-full" lastModified={drink.modifiedAt}/>
          </div>
          <div class="font-bold text-center text-2xl">
            &euro;&nbsp;{(drink.price / 100).toFixed(2)}
          </div>
        </Card>
      {/each}
    </svelte:boundary>
  </div>
  {#if showHidden}
    <Section name="Hidden drinks">
      <div class="mt-4 grid grid-cols-4 gap-4">
        <svelte:boundary>
          {#snippet pending()}
            <Spinner>Loading hidden drinks</Spinner>
          {/snippet}
          {#each await getHiddenDrinks()! as drink(drink.id)}
            <Card as="a" href={`/drinks/${drink.id}`} class="bg-ctp-surface1">
              <div class="font-bold text-center text-2xl">{drink.name}</div>
              <div class="w-full py-8 px-4 aspect-square flex items-center justify-center">
                <DrinkImage file={drink.id} class="min-w-full" lastModified={drink.modifiedAt}/>
              </div>
              <div class="font-bold text-center text-2xl">
                &euro;&nbsp;{(drink.price / 100).toFixed(2)}
              </div>
            </Card>
          {/each}
        </svelte:boundary>
      </div>
    </Section>
  {/if}
</Card>

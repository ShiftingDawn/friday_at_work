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
    import {addDrink, getDrinksUnderThreshold, getHiddenDrinks, getVisibleDrinks} from "$lib/functions/drinks.remote";
    import {flash} from "$lib/flash";
    import Spinner from "$comp/spinner.svelte";
    import Center from "$comp/center.svelte";
    import TableRow from "$comp/table_row.svelte";
    import TableHeadCell from "$comp/table_headcell.svelte";
    import TableCell from "$comp/table_cell.svelte";
    import Table from "$comp/table.svelte";

    const {data,}: PageProps = $props();
    const showHidden = $derived(new URLSearchParams(page.url.search).has("hidden", "true"));
    let modalOpen = $state(false);
    let newDrinkFormLoading = $state(false);
</script>

<form {...addDrink.enhance(async form => {
  newDrinkFormLoading = true;
  try {
    if (await form.submit()) {
      flash("success", `Added drink ${addDrink.fields.name.value} to the menu`);
    } else {
      flash("error", `Could not add drink ${addDrink.fields.name.value} to the menu`);
    }
  } catch {
    flash("error", "Could not add drink to the menu", "An unknown error occurred");
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
        <FormInput {...addDrink.fields.image.as("file")} disabled={newDrinkFormLoading}
                   class="p-0 file:h-8 file:bg-surface2 file:px-2 file:mr-2 cursor-pointer"/>
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
        <Center>
          <Spinner>Loading drinks</Spinner>
        </Center>
      {/snippet}
      {#each await getVisibleDrinks() as drink(drink.id)}
        <Card as="a" href={`/drinks/${drink.id}`} class="bg-surface1 shadow-none">
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
            <Center>
              <Spinner>Loading hidden drinks</Spinner>
            </Center>
          {/snippet}
          {#each await getHiddenDrinks()! as drink(drink.id)}
            <Card as="a" href={`/drinks/${drink.id}`} class="bg-surface1">
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

{#await getDrinksUnderThreshold()}
  <!-- NOOP -->
{:then drinks}
  {#if drinks.length > 0}
    <Card title="Threshold error" class="mt-4">
      <div class="w-full overflow-auto">
        <Table>
          <thead>
            <TableRow>
              <TableHeadCell class="w-full">Name</TableHeadCell>
              <TableHeadCell>Threshold</TableHeadCell>
              <TableHeadCell>Stock</TableHeadCell>
              <TableHeadCell>Missing</TableHeadCell>
              <TableHeadCell/>
            </TableRow>
          </thead>
          <tbody>
            {#each drinks as drink(`threshold_${drink.id}`)}
              <TableRow>
                <TableCell>{drink.name}</TableCell>
                <TableCell>{drink.threshold}</TableCell>
                <TableCell>{drink.totalStock - drink.totalConsumptions}</TableCell>
                <TableCell>{drink.missingAmount}</TableCell>
                <TableCell>
                  <Button as="a" href={`/drinks/${drink.id}`} class="w-fit">
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            {/each}
          </tbody>
        </Table>
      </div>
    </Card>
  {/if}
{:catch}
  <Card title="Threshold error" class="mb-4">
    <p>An error occurred while checking thresholds.</p>
  </Card>
{/await}

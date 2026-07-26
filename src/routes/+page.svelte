<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import IconSubmit from "$icon/submit.svelte";
  import IconButton from "$comp/icon_button.svelte";
  import FormRadio from "$comp/form_radio.svelte";
  import Section from "$comp/section.svelte";
  import DrinkImage from "$comp/drink_image.svelte";
  import {flash} from "$lib/flash";
  import {
    addConsumption,
    getDrinksForConsumption,
    getDrinksUnderThreshold,
    getPeopleForConsumption
  } from "$lib/functions/consumption.remote";
  import Spinner from "$comp/spinner.svelte";
  import Center from "$comp/center.svelte";
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import TableCell from "$comp/table_cell.svelte";
  import {onMount} from "svelte";
  import Button from "$comp/button.svelte";

  const {data,}: PageProps = $props();
  onMount(() => {
    getDrinksUnderThreshold().then(console.log).catch(console.error);
  });
</script>
{#await getDrinksUnderThreshold()}
  <!-- NOOP -->
{:then drinks}
  {#if drinks.length > 0}
    <Card title="Threshold error" class="mb-4">
      <table class="w-full">
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
      </table>
    </Card>
  {/if}
{:catch}
  <Card title="Threshold error" class="mb-4">
    <p>An error occurred while checking thresholds.</p>
  </Card>
{/await}
{#if !data.canWrite}
  <Card title="Register consumption">
    <p>You do not have the permission to register consumptions</p>
  </Card>
{:else}
  <form {...addConsumption.enhance(async form => {
    try {
      flash("info", "Consumption", "Processing...");
      if (await form.submit()) {
        form.element.reset();
        flash("success", "Consumption", "Registered successfully");
      } else {
        flash("error", "Could not register consumption");
      }
    } catch {
      flash("error", "Could not register consumption", "An unknown error occurred");
    }
  })} class="flex flex-col gap-4">
    <Card title="Register consumption">
      {#snippet action()}
        <IconButton type="submit">
          <IconSubmit/>
        </IconButton>
      {/snippet}
      <Section name="Select person" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <svelte:boundary>
          {#snippet pending()}
            <Center>
              <Spinner>Loading people</Spinner>
            </Center>
          {/snippet}
          {#each await getPeopleForConsumption() as person(person.id)}
            <FormRadio {...addConsumption.fields.person.as("radio", person.id)}>
              {person.name}
            </FormRadio>
          {/each}
        </svelte:boundary>
      </Section>
      <Section name="Select drink" class="flex flex-col gap-4">
        <svelte:boundary>
          {#snippet pending()}
            <Center>
              <Spinner>Loading drinks</Spinner>
            </Center>
          {/snippet}
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each await getDrinksForConsumption() as drink(drink.id)}
              <FormRadio {...addConsumption.fields.drink.as("radio", drink.id)}>
                <DrinkImage file={drink.id} lastModified={drink.modifiedAt}/>
                {drink.name}
              </FormRadio>
            {/each}
          </div>
        </svelte:boundary>
      </Section>
    </Card>
  </form>
{/if}

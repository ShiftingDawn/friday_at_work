<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import IconSubmit from "$icon/submit.svelte";
  import IconButton from "$comp/icon_button.svelte";
  import FormRadio from "$comp/form_radio.svelte";
  import Section from "$comp/section.svelte";
  import DrinkImage from "$comp/drink_image.svelte";
  import {flash} from "$lib/flash";
  import {addConsumption, getDrinksForConsumption, getPeopleForConsumption} from "$lib/functions/consumption.remote";
  import {getDrinksUnderThreshold} from "$lib/functions/drinks.remote";
  import Spinner from "$comp/spinner.svelte";
  import Center from "$comp/center.svelte";

  const {data,}: PageProps = $props();
</script>

{#await getDrinksUnderThreshold()}
  <!-- NOOP -->
{:then drinks}
  {#if drinks.length > 0}
    <div class="bg-error text-base p-4 rounded-2xl shadow-lg mb-4">
      {#if drinks.length === 1}
        One drink is
      {:else}
        Multiple drinks are
      {/if}
      not meeting their set threshold. Visit the drinks page for more details.
    </div>
  {/if}
{/await}
{#if !data.canWrite}
  <Card title="Register consumption">
    <p>You do not have the permission to register consumptions</p>
  </Card>
{:else}
  <form {...addConsumption.enhance(async form => {
    try {
      const personRadio = document.querySelector(`input[value='${form.fields.person.value()}']`) as HTMLInputElement;
      const personName = (personRadio.nextSibling! as unknown as {wholeText: string}).wholeText.trim();
      flash("info", "Consumption", `Processing drink for ${personName}`);
      if (await form.submit()) {
        form.element.reset();
        flash("success", "Consumption", `Poured one out for ${personName}`);
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

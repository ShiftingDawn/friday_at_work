<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import IconSubmit from "$icon/submit.svelte";
  import FormRadio from "$comp/form_radio.svelte";
  import Section from "$comp/section.svelte";
  import DrinkImage from "$comp/drink_image.svelte";
  import {flash} from "$lib/flash";
  import {addConsumption, getDrinksForConsumption, getPeopleForConsumption} from "$lib/functions/consumption.remote";
  import {getDrinksUnderThreshold} from "$lib/functions/drinks.remote";
  import Spinner from "$comp/spinner.svelte";
  import Center from "$comp/center.svelte";
  import {getRandomElement} from "$lib";
  import Button from "$comp/button.svelte";
  import {onMount} from "svelte";

  const {data,}: PageProps = $props();

  function testThreshold() {
    getDrinksUnderThreshold().then(drinks => {
      if (drinks.length <= 0) return;
      flash("error", `${drinks.length === 1 ? "One drink is" : "Multiple drinks are"} not meeting their set threshold`, "Visit the drinks page for more details");
    });
  }

  onMount(testThreshold);
</script>

{#if !data.canWrite}
  <Card title="Register consumption">
    <p>You do not have the permission to register consumptions</p>
  </Card>
{:else}
  <form {...addConsumption.enhance(async form => {
    let timeout = -1;
    try {
      const personRadio = document.querySelector(`input[value='${form.fields.person.value()}']`) as HTMLInputElement;
      const personName = (personRadio.nextSibling! as unknown as { wholeText: string }).wholeText.trim();
      timeout = setTimeout(() => {
        flash("info", "Still pouring...");
      }, 3000) as never as number;
      if (await form.submit()) {
        form.element.reset();
        flash("success", "Consumption", getRandomElement([
          `Poured one out for ${personName}`,
          `Enjoy your drink, ${personName}!`,
        ]));
        setTimeout(() => testThreshold(), 3000);
      } else {
        flash("error", getRandomElement([
          `Could not pour one out for ${personName}`,
          `Could not register a consumption for ${personName}!`,
        ]));
      }
    } catch {
      flash("error", "Could not register consumption", "An unknown error occurred");
    }
    clearTimeout(timeout);
  })} class="flex flex-col gap-4">
    <Card title="Register consumption">
      {#snippet action()}
        <Button type="submit" icon={IconSubmit}>
          Save
        </Button>
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

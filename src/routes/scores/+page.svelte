<script lang="ts">
    import Card from "$comp/card.svelte";
    import Section from "$comp/section.svelte";
    import Spinner from "$comp/spinner.svelte";
    import Center from "$comp/center.svelte";
    import {
      getLastMonthTopDrinkers, getLastMonthTopDrinks,
      getLastWeekTopDrinkers, getLastWeekTopDrinks,
      getMonthlyTopDrinkers, getMonthlyTopDrinks,
      getWeeklyTopDrinkers, getWeeklyTopDrinks
    } from "$lib/functions/scores.remote";
    import Scoretable from "$comp/scoretable.svelte";
</script>

<Card title="Top drinkers">
  <Section name="This week">
    {#await getWeeklyTopDrinkers()}
      <Center>
        <Spinner>Loading people</Spinner>
      </Center>
    {:then people}
      {#if people.length > 0}
        <Scoretable rows={people.map(person => ({
          id: person.id,
          label: person.name,
          amount: person.amount,
        }))}/>
      {:else}
        <p>No data available...</p>
      {/if}
    {/await}
  </Section>
  <Section name="Last week">
    {#await getLastWeekTopDrinkers()}
      <Center>
        <Spinner>Loading people</Spinner>
      </Center>
    {:then people}
      {#if people.length > 0}
        <Scoretable rows={people.map(person => ({
          id: person.id,
          label: person.name,
          amount: person.amount,
        }))}/>
      {:else}
        <p>No data available...</p>
      {/if}
    {/await}
  </Section>
  <Section name="This month">
    {#await getMonthlyTopDrinkers()}
      <Center>
        <Spinner>Loading people</Spinner>
      </Center>
    {:then people}
      {#if people.length > 0}
        <Scoretable rows={people.map(person => ({
          id: person.id,
          label: person.name,
          amount: person.amount,
        }))}/>
      {:else}
        <p>No data available...</p>
      {/if}
    {/await}
  </Section>
  <Section name="Last month">
    {#await getLastMonthTopDrinkers()}
      <Center>
        <Spinner>Loading people</Spinner>
      </Center>
    {:then people}
      {#if people.length > 0}
        <Scoretable rows={people.map(person => ({
          id: person.id,
          label: person.name,
          amount: person.amount,
        }))}/>
      {:else}
        <p>No data available...</p>
      {/if}
    {/await}
  </Section>
</Card>

<Card title="Top drinks" class="mt-4">
  <Section name="This week">
    {#await getWeeklyTopDrinks()}
      <Center>
        <Spinner>Loading drinks</Spinner>
      </Center>
    {:then drinks}
      {#if drinks.length > 0}
        <Scoretable rows={drinks.map(drink => ({
          id: drink.id,
          label: drink.name,
          amount: drink.amount,
        }))}/>
      {:else}
        <p>No data available...</p>
      {/if}
    {/await}
  </Section>
  <Section name="Last week">
    {#await getLastWeekTopDrinks()}
      <Center>
        <Spinner>Loading drinks</Spinner>
      </Center>
    {:then drinks}
      {#if drinks.length > 0}
        <Scoretable rows={drinks.map(drink => ({
          id: drink.id,
          label: drink.name,
          amount: drink.amount,
        }))}/>
      {:else}
        <p>No data available...</p>
      {/if}
    {/await}
  </Section>
  <Section name="This month">
    {#await getMonthlyTopDrinks()}
      <Center>
        <Spinner>Loading drinks</Spinner>
      </Center>
    {:then drinks}
      {#if drinks.length > 0}
        <Scoretable rows={drinks.map(drink => ({
          id: drink.id,
          label: drink.name,
          amount: drink.amount,
        }))}/>
      {:else}
        <p>No data available...</p>
      {/if}
    {/await}
  </Section>
  <Section name="Last month">
    {#await getLastMonthTopDrinks()}
      <Center>
        <Spinner>Loading drinks</Spinner>
      </Center>
    {:then drinks}
      {#if drinks.length > 0}
        <Scoretable rows={drinks.map(drink => ({
          id: drink.id,
          label: drink.name,
          amount: drink.amount,
        }))}/>
      {:else}
        <p>No data available...</p>
      {/if}
    {/await}
  </Section>
</Card>

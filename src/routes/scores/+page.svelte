<script lang="ts">
    import Card from "$comp/card.svelte";
    import Section from "$comp/section.svelte";
    import Spinner from "$comp/spinner.svelte";
    import Center from "$comp/center.svelte";
    import {
      getLastMonthTopDrinkers,
      getLastMonthTopDrinks,
      getLastWeekTopDrinkers,
      getLastWeekTopDrinks,
      getMonthlyTopDrinkers,
      getMonthlyTopDrinks,
      getWeeklyTopDrinkers,
      getWeeklyTopDrinks
    } from "$lib/functions/scores.remote";
    import Scoretable from "$comp/scoretable.svelte";
    import ScoreboardPie from "$comp/scoreboard_pie.svelte";
</script>

<Card title="Top drinkers">
  <Section name="This week">
    {#await getWeeklyTopDrinkers()}
      <Center>
        <Spinner>Loading people</Spinner>
      </Center>
    {:then people}
      {@const rows = people.map(person => ({
        id: person.id,
        label: person.name,
        amount: person.amount,
      }))}
      {#if people.length > 0}
        <div class="w-full flex justify-center">
          <ScoreboardPie id="drinkersthisweekpie" {rows}/>
        </div>
        <Scoretable id="drinkersthisweekbar" {rows}/>
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
      {@const rows = people.map(person => ({
        id: person.id,
        label: person.name,
        amount: person.amount,
      }))}
      {#if people.length > 0}
        <div class="w-full flex justify-center">
          <ScoreboardPie id="drinkerslastweekpie" {rows}/>
        </div>
        <Scoretable id="drinkerslastweekbar" {rows}/>
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
      {@const rows = people.map(person => ({
        id: person.id,
        label: person.name,
        amount: person.amount,
      }))}
      {#if people.length > 0}
        <div class="w-full flex justify-center">
          <ScoreboardPie id="drinkersthismonthpie" {rows}/>
        </div>
        <Scoretable id="drinkersthismonthbar" {rows}/>
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
      {@const rows = people.map(person => ({
        id: person.id,
        label: person.name,
        amount: person.amount,
      }))}
      {#if people.length > 0}
        <div class="w-full flex justify-center">
          <ScoreboardPie id="drinkerslastmonthpie" {rows}/>
        </div>
        <Scoretable id="drinkerslastmonthbar" {rows}/>
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
      {@const rows = drinks.map(drink => ({
        id: drink.id,
        label: drink.name,
        amount: drink.amount,
      }))}
      {#if drinks.length > 0}
        <div class="w-full flex justify-center">
          <ScoreboardPie id="drinksthisweekpie" {rows}/>
        </div>
        <Scoretable id="drinksthisweekbar" {rows}/>
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
      {@const rows = drinks.map(drink => ({
        id: drink.id,
        label: drink.name,
        amount: drink.amount,
      }))}
      {#if drinks.length > 0}
        <div class="w-full flex justify-center">
          <ScoreboardPie id="drinkslastweekpie" {rows}/>
        </div>
        <Scoretable id="drinkslastweekbar" {rows}/>
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
      {@const rows = drinks.map(drink => ({
        id: drink.id,
        label: drink.name,
        amount: drink.amount,
      }))}
      {#if drinks.length > 0}
        <div class="w-full flex justify-center">
          <ScoreboardPie id="drinksthismonthpie" {rows}/>
        </div>
        <Scoretable id="drinksthismonthbar" {rows}/>
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
      {@const rows = drinks.map(drink => ({
        id: drink.id,
        label: drink.name,
        amount: drink.amount,
      }))}
      {#if drinks.length > 0}
        <div class="w-full flex justify-center">
          <ScoreboardPie id="drinkslastmonthpie" {rows}/>
        </div>
        <Scoretable id="drinkslastmonthbar" {rows}/>
      {:else}
        <p>No data available...</p>
      {/if}
    {/await}
  </Section>
</Card>

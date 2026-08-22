<script lang="ts">
    import Card from "$comp/card.svelte";
    import Section from "$comp/section.svelte";
    import Spinner from "$comp/spinner.svelte";
    import Center from "$comp/center.svelte";
    import {getLastWeekTopDrinkers, getWeeklyTopDrinkers} from "$lib/functions/scores.remote";
    import Scoretable from "$comp/scoretable.svelte";
</script>

<Card title="Top drinkers">
  <Section name="This week">
    {#await getWeeklyTopDrinkers()}
      <Center>
        <Spinner>Loading people</Spinner>
      </Center>
    {:then currentWeekPeople}
      {#if currentWeekPeople.length > 0}
        <Scoretable rows={currentWeekPeople.map(person => ({
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
    {:then lastWeekPeople}
      {#if lastWeekPeople.length > 0}
        <Scoretable rows={lastWeekPeople.map(person => ({
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

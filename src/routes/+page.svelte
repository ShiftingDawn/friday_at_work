<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import IconSubmit from "$icon/submit.svelte";
  import IconButton from "$comp/icon_button.svelte";
  import FormRadio from "$comp/form_radio.svelte";
  import Section from "$comp/section.svelte";
  import DrinkImage from "$comp/drink_image.svelte";

  const {data,}: PageProps = $props();
</script>
{#if !data.canWrite}
    <Card title="Register consumption">
        <p>You do not have the permission to register consumptions</p>
    </Card>
{:else}
    <Card title="Register consumption" as="form" method="POST" class="flex flex-col gap-4">
        {#snippet action()}
            <IconButton type="submit">
                <IconSubmit/>
            </IconButton>
        {/snippet}
        <Section name="Select person" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {#each data.people as person(person.id)}
                <FormRadio name="person" value={person.id}>
                    {person.name}
                </FormRadio>
            {/each}
        </Section>
        <Section name="Select drink" class="flex flex-col gap-4">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {#each data.drinks as drink(drink.id)}
                    <FormRadio name="drink" value={drink.id}>
                        <DrinkImage file={drink.id} lastModified={drink.modifiedAt}/>
                        {drink.name}
                    </FormRadio>
                {/each}
            </div>
        </Section>
    </Card>
{/if}

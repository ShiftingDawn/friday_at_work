<script lang="ts">
  import Button from "$comp/button.svelte";
  import Card from "$comp/card.svelte";
  import IconButton from "$comp/icon_button.svelte";
  import IconSettings from "$icon/settings.svelte";

  const {data,} = $props();
</script>

<Card title="Account" class="max-w-md mx-auto">
  {#snippet action()}
    {#if data.isUserAdmin}
      <IconButton as="a" href="/account/admin">
        <IconSettings/>
      </IconButton>
    {/if}
  {/snippet}
  <div class="flex flex-col gap-4">
    <Button as="a" href="/account/password">
      Change password
    </Button>
  </div>
</Card>

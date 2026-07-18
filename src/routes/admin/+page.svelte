<script lang="ts">
  import Card from "$lib/components/card.svelte";
  import Button from "$lib/components/button.svelte";
</script>

<Card title="Admin dashboard" class="max-w-md mx-auto">
    <div class="flex flex-col gap-4">
        <Button as="a" href="/admin/users">
            Manage users
        </Button>
    </div>
</Card>

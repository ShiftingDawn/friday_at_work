<script lang="ts">
  import Card from "$comp/card.svelte";
  import Button from "$comp/button.svelte";
</script>

<Card title="Admin dashboard" class="max-w-md mx-auto">
    <div class="flex flex-col gap-4">
        <Button as="a" href="/account/admin/users">
            Manage users
        </Button>
    </div>
</Card>

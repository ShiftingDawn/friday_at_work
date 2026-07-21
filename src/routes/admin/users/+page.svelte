<script lang="ts">
  import Card from "$comp/card.svelte";
  import BackButton from "$comp/back_button.svelte";
  import IconButton from "$comp/icon_button.svelte";
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import TableCell from "$comp/table_cell.svelte";
  import Modal from "$comp/modal.svelte";
  import IconCreate from "$icon/plus.svelte";
  import FormInput from "$comp/form_input.svelte";
  import FormCheckbox from "$comp/form_checkbox.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import Button from "$comp/button.svelte";

  const {data,} = $props();
  let modalOpen = $state(false);
</script>

<Card title="Manage users">
    {#snippet back()}
        <BackButton href="/admin"/>
    {/snippet}
    {#snippet action()}
        <IconButton onclick={() => modalOpen = true}>
            <IconCreate/>
        </IconButton>
    {/snippet}
    <form method="POST" action="?/createuser">
        <Modal title="Add user" open={modalOpen} onclose={() => modalOpen = false}>
            <div class="flex flex-col gap-4">
                <FormLabel name="Username">
                    <FormInput
                            name="username"
                            minlength={3}
                            maxlength={24}
                            required
                            autocomplete="off"
                            autocapitalize="off"
                    />
                </FormLabel>
                <FormLabel name="Password">
                    <FormInput
                            name="password"
                            type="password"
                            minlength={8}
                            required
                            autocomplete="off"
                            autocapitalize="off"
                    />
                </FormLabel>
                <div class="ml-2">
                    <FormCheckbox name="admin">
                        Administrator
                    </FormCheckbox>
                </div>
            </div>
            {#snippet actions()}
                <Button type="submit">Create user</Button>
            {/snippet}
        </Modal>
    </form>
    <table class="w-full">
        <thead>
        <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Workspaces</TableHeadCell>
        </TableRow>
        </thead>
        <tbody>
        {#each data.users! as user(user.id)}
            <TableRow>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user._count.workspaces}</TableCell>
            </TableRow>
        {/each}
        </tbody>
    </table>
</Card>

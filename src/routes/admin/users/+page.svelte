<script lang="ts">
  import Card from "$comp/card.svelte";
  import BackButton from "$comp/back_button.svelte";
  import TableRow from "$comp/table_row.svelte";
  import TableHeadCell from "$comp/table_headcell.svelte";
  import TableCell from "$comp/table_cell.svelte";
  import Modal from "$comp/modal.svelte";
  import IconCreate from "$icon/plus.svelte";
  import FormInput from "$comp/form_input.svelte";
  import FormCheckbox from "$comp/form_checkbox.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import Button from "$comp/button.svelte";
  import Table from "$comp/table.svelte";
  import {adminCreateUser} from "$lib/functions/admin.remote";
  import {flash} from "$lib/flash";

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
  <Modal as="form" title="Add user" open={modalOpen} onclose={() => modalOpen = false}
         {...adminCreateUser.enhance(async form => {
           try {
             if (await form.submit()) {
               flash("success", `User ${form.fields.username.value()} has been created`);
               form.element.reset();
               modalOpen = false;
             } else {
               flash("error", `Could not create user ${form.fields.username.value()}`);
             }
           } catch {
             flash("error", "Could not create user");
           }
         })}
  >
    <div class="flex flex-col gap-4">
      <FormLabel name="Username" error={adminCreateUser.fields.username.issues()}>
        <FormInput
            {...adminCreateUser.fields.username.as("text")}
            minlength={3}
            maxlength={24}
            required
            autocomplete="off"
            autocapitalize="off"
        />
      </FormLabel>
      <FormLabel name="Password" error={adminCreateUser.fields._password.issues()}>
        <FormInput
            {...adminCreateUser.fields._password.as("password")}
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
  <Table>
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
  </Table>
</Card>

<script lang="ts">
  import Card from "$comp/card.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import FormInput from "$comp/form_input.svelte";
  import Button from "$comp/button.svelte";
  import Modal from "$comp/modal.svelte";
  import Section from "$comp/section.svelte";
  import IconSubmit from "$icon/plus.svelte";
  import IconButton from "$comp/icon_button.svelte";
  import {createWorkspace, selectWorkspace} from "$lib/functions/workspace.remote";
  import {flash} from "$lib/flash";
  import {goto} from "$app/navigation";
  import {resolve} from "$app/paths";

  const {data,} = $props();
  let modalOpen = $state(false);
  let createFormLoading = $state(false);
</script>

{#if data.hasWorkspace}
  <Card title="Current Workspace" class="mb-4 max-w-md mx-auto">
    <Section>
      <span>{data.workspace}</span>
    </Section>
    <Button as="a" href={`/workspace/${data.workspaceId}`} class="w-full">
      Edit
    </Button>
  </Card>
{/if}

<form {...createWorkspace.enhance(async form => {
  createFormLoading = true;
  try {
    if (await form.submit()) {
      flash("success", "Workspace has been created");
      createFormLoading = false;
      modalOpen = false;
    }
  } catch {
    flash("error", "Could not create workspace", "An unknown error occurred");
  }
})}>
  <Modal title="Register new workspace" open={modalOpen} onclose={() => modalOpen = false}
         canclose={!createFormLoading}>
    <FormLabel name="Name" error={createWorkspace.fields.name.issues()}>
      <FormInput {...createWorkspace.fields.name.as("text")} min="3" disabled={createFormLoading}/>
    </FormLabel>
    {#snippet actions()}
      <Button type="submit" class="font-bold uppercase" loading={createFormLoading}>
        Create
      </Button>
    {/snippet}
  </Modal>
</form>

<Card title="Select workspace" class="max-w-md mx-auto">
  {#snippet action()}
    <IconButton onclick={() => modalOpen = true}>
      <IconSubmit/>
    </IconButton>
  {/snippet}
  <div class="flex flex-col gap-2">
    {#each data.workspaces as workspace(workspace.id)}
      <Button class="w-full" onclick={async () => {
        try {
          await selectWorkspace(workspace.id);
          flash("success", "Loaded workspace", workspace.name);
          await goto(resolve("/"));
        } catch {
          flash("error", "Could not select workspace", "An unknown error occurred");
        }
      }}>
        {workspace.name}
      </Button>
    {/each}
  </div>
</Card>

<script lang="ts">
    import Card from "$lib/components/card.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import Button from "$lib/components/button.svelte";
    import Modal from "$lib/components/modal.svelte";
    import Section from "$lib/components/section.svelte";
    import IconSubmit from "$lib/icon/plus.svelte";
    import IconButton from "$lib/components/icon_button.svelte";
    import {enhance} from "$app/forms";

    const {data,} = $props();
    let modalOpen = $state(false);
    let createFormLoading = $state(false);

    function handleSelect(id: string) {
      (document.querySelector("#workspaceselectorform > input[type=hidden]") as HTMLInputElement)
        .value = id;
      (document.querySelector("#workspaceselectorform") as HTMLFormElement)
        .submit();
    }
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

<form method="POST" action="?/create" use:enhance={() => {
  createFormLoading = true;
  return async ({update,}) => {
    await update();
    createFormLoading = false;
    modalOpen = false;
  };
}}>
    <Modal title="Register new workspace" open={modalOpen} onclose={() => modalOpen = false}
           canclose={!createFormLoading}>
        <FormLabel name="Name">
            <FormInput type="text" min="3" name="name" disabled={createFormLoading}/>
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
    <form method="POST" id="workspaceselectorform" action="?/select">
        <input type="hidden" name="workspace"/>
    </form>
    <div class="flex flex-col gap-2">
        {#each data.workspaces as workspace(workspace.id)}
            <Button class="w-full" onclick={() => handleSelect(workspace.id)}>
                {workspace.name}
            </Button>
        {/each}
    </div>
</Card>

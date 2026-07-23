<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import BackButton from "$comp/back_button.svelte";
  import Section from "$comp/section.svelte";
  import {addWorkspacePermission, updateWorkspace} from "$lib/functions/workspace.remote";
  import FormLabel from "$comp/form_label.svelte";
  import FormInput from "$comp/form_input.svelte";
  import Button from "$comp/button.svelte";
  import {flash} from "$lib/flash";
  import Modal from "$comp/modal.svelte";
  import {onMount} from "svelte";

  const {data,}: PageProps = $props();
  let modalOpen = $state(false);
  let updateFormLoading = $state(false);
  let addPermissionFormLoading = $state(false);

  onMount(() => updateWorkspace.fields.set({name: data.ws!.name,}));
</script>

<Card title={data.ws!.name}>
  {#snippet back()}
    <BackButton href="/workspace"/>
  {/snippet}
  <Section name={data.canAdmin ? "Update data" : "Data"}>
    {#if data.canAdmin}
      <form {...updateWorkspace.enhance(async form => {
        updateFormLoading = true;
        try {
          if (await form.submit()) {
            flash("success", "Workspace has been updated");
          } else {
            flash("error", "Could not update workspace");
          }
        } catch {
          flash("error", "Could not update workspace", "An unknown error occurred");
        }
        updateFormLoading = false;
      }
      )} class="flex flex-col gap-4 max-w-md">
        <FormLabel name="Name">
          <FormInput {...updateWorkspace.fields.name.as("text")} min="3" disabled={updateFormLoading}/>
        </FormLabel>
        <Button type="submit" class="w-full" loading={updateFormLoading}>
          Save
        </Button>
      </form>
    {:else}
      <p>Name: {data.ws!.name}</p>
    {/if}
  </Section>
  <Section name={data.canAdmin ? "Manage permissions" : "Permissions"}>
    {#if data.canAdmin}
      <Button onclick={() => modalOpen = true}>
        Add
      </Button>
      <form {...addWorkspacePermission.enhance(async form => {
        addPermissionFormLoading = true;
        try {
          if (await form.submit()) {
            addPermissionFormLoading = false;
            modalOpen = false;
            flash("success", "Added permission successfully");
          } else {
            flash("error", "Could not add permission");
          }
        } catch {
          flash("error", "Could not add permission", "An unknown error occurred");
        }
      })}>
        <Modal title="Add permission" open={modalOpen} onclose={() => modalOpen = false}
               canclose={!addPermissionFormLoading}>
          <div class="flex flex-col gap-4">
            <FormLabel name="Username">
              <FormInput {...addWorkspacePermission.fields.username.as("text")} min="3" required
                         disabled={addPermissionFormLoading}/>
            </FormLabel>
            <FormLabel name="Permission level">
              <select {...addWorkspacePermission.fields.role.as("select")} required disabled={addPermissionFormLoading}
                      class="w-full bg-ctp-surface1 rounded-full px-4 py-2">
                <option value="read" selected>Read only</option>
                <option value="write">Read and Write</option>
                <option value="admin">Admin</option>
              </select>
            </FormLabel>
          </div>
          {#snippet actions()}
            <Button type="submit" class="font-bold uppercase" loading={addPermissionFormLoading}>
              Add
            </Button>
          {/snippet}
        </Modal>
      </form>
    {/if}
    {#if data.ws!.permissions?.length > 0}
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {#each data.ws!.permissions as permission(permission.id)}
          <Button as="a" href={`/workspace/${data.workspaceId}/permission/${permission.id}`}
                  class="bg-ctp-surface1 shadow-none">
            {permission.user.username}
          </Button>
        {/each}
      </div>
    {/if}
  </Section>
</Card>

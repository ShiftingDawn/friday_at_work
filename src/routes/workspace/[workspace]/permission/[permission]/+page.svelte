<script lang="ts">
  import type {PageProps} from "./$types";
  import Card from "$comp/card.svelte";
  import Button from "$comp/button.svelte";
  import BackButton from "$comp/back_button.svelte";
  import IconButton from "$comp/icon_button.svelte";
  import Section from "$comp/section.svelte";
  import DeleteIcon from "$icon/delete.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import {deleteWorkspacePermission, updateWorkspacePermission} from "$lib/functions/workspace.remote";
  import {flash} from "$lib/flash";
  import {goto} from "$app/navigation";
  import {resolve} from "$app/paths";

  const {data,}: PageProps = $props();
  let updatePermissionFormLoading = $state(false);
</script>

<Card title="Edit permission">
  {#snippet back()}
    <BackButton href={`/workspace/${data.workspaceId}`}/>
  {/snippet}
  {#snippet action()}
    {#if data.canAdmin}
      <IconButton type="submit" onclick={async () => {
        await deleteWorkspacePermission();
        flash("success", "Permission deleted succesfully");
        await goto(resolve(`/workspace/${data.workspaceId}`));
      }}>
        <DeleteIcon/>
      </IconButton>
    {/if}
  {/snippet}
  {#if data.canAdmin}
    <p>Editing permission for user <i>{data.permission!.user.username}</i> for workspace <i>{data.workspace}</i></p>
    <Section name="Update">
      <form {...updateWorkspacePermission.enhance(async form => {
        updatePermissionFormLoading = true;
        try {
          if (await form.submit()) {
            flash("success", "Permission updated successfully");
          } else {
            flash("error", "Could not update permission");
          }
          updatePermissionFormLoading = false;
        } catch {
          flash("error", "Could not update permission", "An unknown error occurred");
        }
      })} class="max-w-md flex flex-col gap-4">
        <FormLabel name="Permission level" error={updateWorkspacePermission.fields.role.issues()}>
          <select {...updateWorkspacePermission.fields.role.as("select")} required
                  disabled={updatePermissionFormLoading} class="w-full bg-ctp-surface1 rounded-full px-4 py-2">
            <option value="read" selected={data.permission!.permission === "READ"}>Read only</option>
            <option value="write" selected={data.permission!.permission === "WRITE"}>Read and Write</option>
            <option value="admin" selected={data.permission!.permission === "ADMIN"}>Administrator</option>
          </select>
        </FormLabel>
        <Button type="submit" loading={updatePermissionFormLoading}>
          Save
        </Button>
      </form>
    </Section>
  {:else}
    <p>Viewing permission for user <i>{data.permission!.user.username}</i> for workspace <i>{data.workspace}</i></p>
    <p>Permission level:
      {data.permission!.permission === "READ" ? "Read only" : ""}
      {data.permission!.permission === "WRITE" ? "Read and Write" : ""}
      {data.permission!.permission === "ADMIN" ? "Administrator" : ""}
    </p>
  {/if}
</Card>

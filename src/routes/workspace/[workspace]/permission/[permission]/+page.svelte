<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import Button from "$lib/components/button.svelte";
    import BackButton from "$lib/components/back_button.svelte";
    import IconButton from "$lib/components/icon_button.svelte";
    import Section from "$lib/components/section.svelte";
    import DeleteIcon from "$lib/icon/delete.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import {enhance} from "$app/forms";

    const {data}: PageProps = $props();
    let updatePermissionFormLoading = $state(false);
</script>

<Card title="Edit permission">
    {#snippet back()}
        <BackButton href={`/workspace/${data.workspaceId}`}/>
    {/snippet}
    {#snippet action()}
        {#if data.canAdmin}
            <form method="POST" action="?/deletepermission">
                <IconButton type="submit">
                    <DeleteIcon/>
                </IconButton>
            </form>
        {/if}
    {/snippet}
    {#if data.canAdmin}
        <p>Editing permission for user <i>{data.permission!.user.username}</i> for workspace <i>{data.workspace}</i></p>
        <Section name="Update">
            <form method="POST" action="?/updatepermission" class="max-w-md flex flex-col gap-4" use:enhance={() => {
                updatePermissionFormLoading = true;
                return async ({update}) => {
                    await update();
                    updatePermissionFormLoading = false;
                };
            }}>
                <FormLabel name="Permission level">
                    <select name="role" required class="w-full bg-ctp-surface1 rounded-full px-4 py-2"
                            disabled={updatePermissionFormLoading}>
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
<script lang="ts">
    import type {PageProps} from "./$types";
    import Card from "$lib/components/card.svelte";
    import BackButton from "$lib/components/back_button.svelte";
    import Section from "$lib/components/section.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import Button from "$lib/components/button.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import Modal from "$lib/components/modal.svelte";
    import {enhance} from "$app/forms";

    const {data}: PageProps = $props();
    let modalOpen = $state(false);
    let updateFormLoading = $state(false);
    let addPermissionFormLoading = $state(false);
</script>

<Card title={data.ws!.name}>
    {#snippet back()}
        <BackButton href="/workspace"/>
    {/snippet}
    <Section name={data.canAdmin ? "Update data" : "Data"}>
        {#if data.canAdmin}
            <form method="POST" action="?/update" class="flex flex-col gap-4 max-w-md" use:enhance={() => {
                updateFormLoading = true;
                return async ({update}) => {
                    await update();
                    updateFormLoading = false;
                };
            }}>
                <FormLabel name="Name">
                    <FormInput type="text" min="3" name="name" value={data.ws!.name} disabled={updateFormLoading}/>
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
            <form method="POST" action="?/addpermission" use:enhance={() => {
                updateFormLoading = true;
                return async ({update}) => {
                    await update();
                    updateFormLoading = false;
                    modalOpen = false;
                };
            }}>
                <Modal title="Add permission" open={modalOpen} onclose={() => modalOpen = false}
                       canclose={!updateFormLoading}>
                    <div class="flex flex-col gap-4">
                        <FormLabel name="Username">
                            <FormInput type="text" min="3" name="username" disabled={updateFormLoading}/>
                        </FormLabel>
                        <FormLabel name="Permission level">
                            <select name="role" required disabled={updateFormLoading}
                                    class="w-full bg-ctp-surface1 rounded-full px-4 py-2">
                                <option value="read" selected>Read only</option>
                                <option value="write">Read and Write</option>
                                <option value="admin">Admin</option>
                            </select>
                        </FormLabel>
                    </div>
                    {#snippet actions()}
                        <Button type="submit" class="font-bold uppercase" loading={updateFormLoading}>
                            Add
                        </Button>
                    {/snippet}
                </Modal>
            </form>
        {/if}
        {#if data.ws!.permissions?.length > 0}
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {#each data.ws!.permissions as permission}
                    <Button as="a" href={`/workspace/${data.workspaceId}/permission/${permission.id}`}
                            class="bg-ctp-surface1 shadow-none">
                        {permission.user.username}
                    </Button>
                {/each}
            </div>
        {/if}
    </Section>
</Card>
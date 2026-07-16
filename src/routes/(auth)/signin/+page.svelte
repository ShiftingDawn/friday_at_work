<script lang="ts">
    import {enhance} from "$app/forms";
    import LinkButton from "$lib/components/link_button.svelte";
    import Button from "$lib/components/button.svelte";
    import Divider from "$lib/components/divider.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import Card from "@/lib/components/card.svelte";

    let {form, data} = $props();
</script>

<Card title="Sign in" class="max-w-md mx-auto">
    <div class="flex flex-col gap-4">
        <p style="color: red">{form?.message ?? ""}</p>
        <form method="post" use:enhance class="flex flex-col gap-2">
            <FormLabel name="Username">
                <FormInput
                        name="username"
                        minlength={3}
                        maxlength={24}
                        required
                        autocomplete="username"
                        autocapitalize="off"
                />
            </FormLabel>
            <FormLabel name="Password">
                <FormInput
                        name="password"
                        type="password"
                        minlength={8}
                        required
                        autocomplete="current-password"
                        autocapitalize="off"
                />
            </FormLabel>
            <div class="mx-auto">
                <Button type="submit">Sign in</Button>
            </div>
        </form>
        {#if data.canRegister}
            <Divider>OR</Divider>
            <LinkButton href="/signup" class="w-full">
                Don&apos;t have an account?
            </LinkButton>
        {/if}
    </div>
</Card>

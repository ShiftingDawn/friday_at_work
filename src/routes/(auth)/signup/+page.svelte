<script lang="ts">
    import {enhance} from "$app/forms";
    import Button from "$lib/components/button.svelte";
    import Divider from "$lib/components/divider.svelte";
    import FormLabel from "$lib/components/form_label.svelte";
    import FormInput from "$lib/components/form_input.svelte";
    import Card from "@/lib/components/card.svelte";
    import type {ActionData} from "./$types";

    let {form,}: { form: ActionData } = $props();
</script>

<Card title="Sign up" class="max-w-md mx-auto">
    <div class="flex flex-col gap-4">
        <p style="color: red">{form?.message ?? ""}</p>
        <form method="post" use:enhance class="flex flex-col gap-2">
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
            <FormLabel name="Confirm password">
                <FormInput
                        name="password2"
                        type="password"
                        minlength={8}
                        required
                        autocomplete="off"
                        autocapitalize="off"
                />
            </FormLabel>
            <div class="mx-auto">
                <Button type="submit">Sign up</Button>
            </div>
        </form>
        <Divider>OR</Divider>
        <Button as="a" href="/signin" class="w-full">
            Already have an account?
        </Button>
    </div>
</Card>

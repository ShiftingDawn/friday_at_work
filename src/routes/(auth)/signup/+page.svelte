<script lang="ts">
  import Button from "$comp/button.svelte";
  import Divider from "$comp/divider.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import FormInput from "$comp/form_input.svelte";
  import Card from "$comp/card.svelte";
  import type {ActionData} from "./$types";
  import {signUp} from "./data.remote";
  import {flash} from "$lib/flash";
  import {redirect} from "@sveltejs/kit";

  let {form,}: { form: ActionData } = $props();
</script>

<Card title="Sign up" class="max-w-md mx-auto">
  <div class="flex flex-col gap-4">
    <p style="color: red">{form?.message ?? ""}</p>
    <form {...signUp.enhance(async form => {
      try {
        if (await form.submit()) {
          flash("success", "Welcome!");
        } else {
          flash("error", "Could not create account");
          return;
        }
      } catch {
        flash("error", "Could not create account", "An unknown error occurred");
        return;
      }
      redirect(302, "/");
    })} class="flex flex-col gap-2">
      <FormLabel name="Username" error={signUp.fields.username.issues()}>
        <FormInput
          name="username"
          minlength={3}
          maxlength={24}
          required
          autocomplete="off"
          autocapitalize="off"
        />
      </FormLabel>
      <FormLabel name="Password" error={signUp.fields.password.issues()}>
        <FormInput
          {...signUp.fields.password.as("password")}
          minlength={8}
          maxlength={255}
          required
          autocomplete="off"
          autocapitalize="off"
        />
      </FormLabel>
      <FormLabel name="Confirm password" error={signUp.fields.password2.issues()}>
        <FormInput
          {...signUp.fields.password2.as("password")}
          minlength={8}
          maxlength={255}
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

<script lang="ts">
  import Button from "$comp/button.svelte";
  import Divider from "$comp/divider.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import FormInput from "$comp/form_input.svelte";
  import Card from "$comp/card.svelte";
  import {signUp} from "$lib/functions/auth.remote";
  import {flash} from "$lib/flash";
  import {goto} from "$app/navigation";
  import {resolve} from "$app/paths";
</script>

<Card title="Sign up" class="max-w-md mx-auto">
  <div class="flex flex-col gap-4">
    <form {...signUp.enhance(async form => {
      try {
        if (await form.submit()) {
          flash("success", "Welcome!");
          await goto(resolve("/"));
        } else {
          flash("error", "Could not create account");
        }
      } catch {
        flash("error", "Could not create account", "An unknown error occurred");
      }
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
      <FormLabel name="Password" error={signUp.fields._password.issues()}>
        <FormInput
          {...signUp.fields._password.as("password")}
          minlength={8}
          maxlength={255}
          required
          autocomplete="off"
          autocapitalize="off"
        />
      </FormLabel>
      <FormLabel name="Confirm password" error={signUp.fields._password2.issues()}>
        <FormInput
          {...signUp.fields._password2.as("password")}
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

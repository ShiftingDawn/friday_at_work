<script lang="ts">
  import Button from "$comp/button.svelte";
  import Divider from "$comp/divider.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import FormInput from "$comp/form_input.svelte";
  import Card from "$comp/card.svelte";
  import {flash} from "$lib/flash";
  import {signIn} from "$lib/functions/auth.remote";
  import {goto} from "$app/navigation";
  import {resolve} from "$app/paths";

  let {data,} = $props();
</script>

<Card title="Sign in" class="max-w-md mx-auto">
  <div class="flex flex-col gap-4">
    <form {...signIn.enhance(async form => {
      try {
        if (await form.submit()) {
          flash("success", "Welcome back!");
          await goto(resolve("/"));
        } else {
          flash("error", "Could not sign in");
        }
      } catch {
        flash("error", "Could not sign in", "An unknown error occurred");
      }
    })} class="flex flex-col gap-2">
      <FormLabel name="Username" error={signIn.fields.username.issues()}>
        <FormInput
          {...signIn.fields.username.as("text")}
          minlength={3}
          maxlength={24}
          required
          autocomplete="username"
          autocapitalize="off"
        />
      </FormLabel>
      <FormLabel name="Password" error={signIn.fields._password.issues()}>
        <FormInput
          {...signIn.fields._password.as("password")}
          minlength={8}
          maxlength={255}
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
      <Button as="a" href="/signup" class="w-full">
        Don&apos;t have an account?
      </Button>
    {/if}
  </div>
</Card>

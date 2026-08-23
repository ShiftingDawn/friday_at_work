<script lang="ts">
  import {enhance} from "$app/forms";
  import Card from "$comp/card.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import FormInput from "$comp/form_input.svelte";
  import Button from "$comp/button.svelte";
</script>

<Card title="Change password" class="max-w-md mx-auto">
  <form method="POST" class="flex flex-col gap-4" use:enhance>
    <FormLabel name="Current Password">
      <FormInput
        name="oldpassword"
        type="password"
        minlength={8}
        required
        autocomplete="off"
        autocapitalize="off"
      />
    </FormLabel>
    <FormLabel name="New password">
      <FormInput
        name="password"
        type="password"
        minlength={8}
        required
        autocomplete="off"
        autocapitalize="off"
      />
    </FormLabel>
    <FormLabel name="Confirm new password">
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
      <Button type="submit">Change password</Button>
    </div>
  </form>
</Card>

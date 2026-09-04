<script lang="ts">
  import Button from "$comp/button.svelte";
  import FormInput from "$comp/form_input.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import Modal from "$comp/modal.svelte";
  import Section from "$comp/section.svelte";
  import {addDrinkRestock} from "$lib/functions/drinks.remote";

  const {expected,}: { expected: number, } = $props();

  let stockCounted = $state(0);
  let enteredAmount = $state("");
  let checkStockModalOpen = $state(false);

  function handleClose() {
    stockCounted = 0;
    enteredAmount = "";
    checkStockModalOpen = false;
  }

  function addAmount() {
    const num = parseInt(enteredAmount, 10);
    if (num && !Number.isNaN(num) && num > 0) {
      stockCounted += num;
    }
    enteredAmount = "";
  }

  function handleSubmit() {
    const difference = expected - stockCounted;
    if (difference === 0) {
      handleClose();
      return;
    }
    addDrinkRestock({amount: difference * -1, correction: true,}).then(() => {
      handleClose();
    });
  }
</script>

<Button onclick={() => checkStockModalOpen = true}>
  Check stock
</Button>

<Modal title="Check stock" open={checkStockModalOpen} onclose={handleClose}>
  <Section>
    <p class="font-bold text-3xl">{expected - stockCounted}</p>
    <p class="mt-2">Counted {stockCounted} of {expected} items</p>
  </Section>
  <Section class="flex flex-col gap-4">
    <FormLabel name="Enter amount">
      <FormInput type="number" min="1" bind:value={enteredAmount} onkeydown={e => {
        if (e.key === "Enter") {
          e.preventDefault();
          addAmount();
          e.currentTarget.focus();
        }
      }}/>
    </FormLabel>
    <Button onclick={addAmount}>
      Add
    </Button>
  </Section>
  {#snippet actions()}
    <Button onclick={handleClose}>
      Cancel
    </Button>
    <Button onclick={handleSubmit}>
      Save correction
    </Button>
  {/snippet}
</Modal>

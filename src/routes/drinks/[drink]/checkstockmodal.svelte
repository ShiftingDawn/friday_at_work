<script lang="ts">
  import Button from "$comp/button.svelte";
  import FormCheckbox from "$comp/form_checkbox.svelte";
  import FormInput from "$comp/form_input.svelte";
  import FormLabel from "$comp/form_label.svelte";
  import Modal from "$comp/modal.svelte";
  import Section from "$comp/section.svelte";
  import {addDrinkStockCheck} from "$lib/functions/drinks.remote";

  const {expected,}: { expected: number, } = $props();

  let stockCounted = $state(0);
  let enteredAmount = $state("");
  let checkStockModalOpen = $state(false);
  let saveCorrection = $state(true);

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
    addDrinkStockCheck({expected, actual: stockCounted, correction: saveCorrection,}).then(() => {
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
  <Section class="max-w-sm flex flex-col gap-4">
    <FormCheckbox name="correction" checked={saveCorrection} onchange={e => saveCorrection = e.currentTarget.checked}>
      Save correction
    </FormCheckbox>
    <p>If enabled, any difference will be corrected so the existing stock becomes the counted stock</p>
  </Section>
  {#snippet actions()}
    <Button onclick={handleClose}>
      Cancel
    </Button>
    <Button onclick={handleSubmit}>
      Save
    </Button>
  {/snippet}
</Modal>

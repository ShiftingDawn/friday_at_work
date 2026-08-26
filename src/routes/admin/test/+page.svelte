<script lang="ts">
    import Button from "$comp/button.svelte";
    import Card from "$comp/card.svelte";
    import Section from "$comp/section.svelte";
    import BackButton from "$comp/back_button.svelte";
    import {flash, type FlashMessageType} from "$lib/flash";

    function testFlash(type: FlashMessageType, title: boolean) {
      if (title) {
        flash(type, "This is a title!", "This is a test message!");
      } else {
        flash(type, "This is a test message!");
      }
    }
</script>

<Card title="Tests" class="max-w-md mx-auto">
  {#snippet back()}
    <BackButton href="/admin"/>
  {/snippet}
  <Section name="Flash messages">
    <div class="flex flex-col gap-4">
      <Button onclick={() => testFlash("success", true)}>
        Success with title
      </Button>
      <Button onclick={() => testFlash("success", false)}>
        Success without title
      </Button>
      <Button onclick={() => testFlash("info", true)}>
        Info with title
      </Button>
      <Button onclick={() => testFlash("info", false)}>
        Info without title
      </Button>
      <Button onclick={() => testFlash("warning", true)}>
        Warning with title
      </Button>
      <Button onclick={() => testFlash("warning", false)}>
        Warning without title
      </Button>
      <Button onclick={() => testFlash("error", true)}>
        Error with title
      </Button>
      <Button onclick={() => testFlash("error", false)}>
        Error without title
      </Button>
    </div>
  </Section>
</Card>

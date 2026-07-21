<script lang="ts">
  import HeaderButton from "$comp/header_button.svelte";
  import HeaderMenuButton from "$comp/header_menu_button.svelte";
  import IconHome from "$icon/home.svelte";
  import IconPerson from "$icon/person.svelte";
  import IconDrinks from "$icon/drinks.svelte";
  import IconWorkspace from "$icon/workspace.svelte";
  import IconAccount from "$icon/account.svelte";
  import IconSignOut from "$icon/signout.svelte";
  import IconButton from "$comp/icon_button.svelte";
  import {twMerge} from "tailwind-merge";

  let menuAnchor = $state<HTMLElement>();
  let menuElement = $state<HTMLDivElement>();
  let menuStyle = $state("");
  $effect(() => {
    if (!menuAnchor || !menuElement) return;
    const rect = menuAnchor.getBoundingClientRect();
    const menuWidth = menuElement.offsetWidth;
    const margin = 8;
    let left = rect.right - menuWidth;
    // Keep the menu on screen.
    left = Math.max(margin, left);
    left = Math.min(left, window.innerWidth - menuWidth - margin);
    menuStyle = `
      position: fixed;
      top: ${rect.top}px;
      left: ${left}px;
    `;
  });
</script>

<nav class="sticky top-0 bg-ctp-crust p-4 flex items-start justify-between gap-4 shadow-xl overflow-auto z-30">
  <div class="flex items-start gap-4">
    <HeaderButton name="Home" href="/">
      <IconHome/>
    </HeaderButton>
    <HeaderButton name="People" href="/people">
      <IconPerson/>
    </HeaderButton>
    <HeaderButton name="Drinks" href="/drinks">
      <IconDrinks/>
    </HeaderButton>
  </div>
  <div class="relative">
    <IconButton onclick={e => menuAnchor = e.currentTarget}>
      <IconAccount/>
    </IconButton>
    <div class={twMerge(
      "fixed inset-0 z-40 hidden",
      menuAnchor && "block"
    )} onclick={() => menuAnchor = undefined} onkeydown={() => menuAnchor = undefined}
         role={menuAnchor ? "button" : undefined} aria-label={menuAnchor ? "Close menu" : undefined}>
    </div>
    <div bind:this={menuElement} style={menuStyle} class={twMerge(
      "fixed origin-top-right rounded-lg bg-ctp-surface1 shadow-xl overflow-hidden z-50",
      "transition-all duration-200 ease-out",
      "scale-95 opacity-0 pointer-events-none",
      menuAnchor && "scale-100 opacity-100 pointer-events-auto"
    )} aria-hidden={!menuAnchor}>
      <ul>
        <HeaderMenuButton name="Workspace" href="/workspace">
          <IconWorkspace/>
        </HeaderMenuButton>
        <HeaderMenuButton name="Account" href="/account">
          <IconAccount/>
        </HeaderMenuButton>
        <HeaderMenuButton name="Sign out" href="/signout" data-sveltekit-reload>
          <IconSignOut/>
        </HeaderMenuButton>
      </ul>
    </div>
  </div>
</nav>

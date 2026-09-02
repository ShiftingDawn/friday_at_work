<script lang="ts">
    import HeaderButton from "$comp/header_button.svelte";
    import HeaderMenuButton from "$comp/header_menu_button.svelte";
    import IconHome from "$icon/home.svelte";
    import IconMenu from "$icon/menu.svelte";
    import IconTrophy from "$icon/trophy.svelte";
    import IconPerson from "$icon/person.svelte";
    import IconDrinks from "$icon/drinks.svelte";
    import IconWorkspace from "$icon/workspace.svelte";
    import IconAccount from "$icon/account.svelte";
    import IconSettings from "$icon/settings.svelte";
    import IconSignOut from "$icon/signout.svelte";
    import IconThemeAuto from "$icon/automode.svelte";
    import IconThemeLight from "$icon/lightmode.svelte";
    import IconThemeDark from "$icon/darkmode.svelte";
    import IconButton from "$comp/icon_button.svelte";
    import {twMerge} from "tailwind-merge";
    import {onNavigate} from "$app/navigation";
    import {theme} from "@/lib/preferences";
    import {get} from "svelte/store";

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
    onNavigate(() => menuAnchor = undefined);

    const {isAdmin,}: { isAdmin: boolean } = $props();

    function switchTheme() {
      const currentTheme = get(theme);
      let newTheme: "light" | "dark" | "auto" = "auto";
      if (currentTheme === "auto") {
        newTheme = "light";
      } else if (currentTheme === "light") {
        newTheme = "dark";
      }
      theme.set(newTheme);
    }
</script>

<nav class="sticky top-0 bg-navbar p-4 flex items-start justify-between gap-4 shadow-xl overflow-auto z-20">
  <div class="flex items-start gap-4">
    <HeaderButton name="Home" href="/">
      <IconHome/>
    </HeaderButton>
    <HeaderButton name="Scores" href="/scores">
      <IconTrophy/>
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
      <IconMenu/>
    </IconButton>
    <div class={twMerge(
      "fixed inset-0 z-30 hidden",
      menuAnchor && "block"
    )} onclick={() => menuAnchor = undefined} onkeydown={() => menuAnchor = undefined}
         role={menuAnchor ? "button" : undefined} aria-label={menuAnchor ? "Close menu" : undefined}>
    </div>
    <div bind:this={menuElement} style={menuStyle} class={twMerge(
      "fixed origin-top-right rounded-lg bg-surface1 shadow-xl overflow-hidden z-40",
      "transition-all duration-200 ease-out",
      "scale-95 opacity-0 pointer-events-none",
      menuAnchor && "scale-100 opacity-100 pointer-events-auto"
    )} aria-hidden={!menuAnchor}>
      <ul>
        <HeaderMenuButton name="Workspace" href="/workspace">
          <IconWorkspace/>
        </HeaderMenuButton>
        <HeaderMenuButton name="Preferences" href="/settings">
          <IconAccount/>
        </HeaderMenuButton>
        {#if isAdmin}
          <HeaderMenuButton name="Admin panel" href="/admin">
            <IconSettings/>
          </HeaderMenuButton>
        {/if}
        {#if $theme === "auto"}
          <HeaderMenuButton as="button" name="Use light theme" onclick={switchTheme}>
            <IconThemeLight/>
          </HeaderMenuButton>
        {:else if $theme == "light"}
          <HeaderMenuButton as="button" name="Use dark theme" onclick={switchTheme}>
            <IconThemeDark/>
          </HeaderMenuButton>
        {:else }
          <HeaderMenuButton as="button" name="Use system theme" onclick={switchTheme}>
            <IconThemeAuto/>
          </HeaderMenuButton>
        {/if}
        <HeaderMenuButton name="Sign out" href="/signout" data-sveltekit-reload>
          <IconSignOut/>
        </HeaderMenuButton>
      </ul>
    </div>
  </div>
</nav>

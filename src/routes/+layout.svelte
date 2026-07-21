<script lang="ts">
  import type {LayoutProps} from "./$types";
  import "./layout.css";
  import HeaderButton from "$comp/header_button.svelte";
  import IconHome from "$icon/home.svelte";
  import IconPerson from "$icon/person.svelte";
  import IconDrinks from "$icon/drinks.svelte";
  import IconWorkspace from "$icon/workspace.svelte";
  import IconSettings from "$icon/settings.svelte";
  import IconSignOut from "$icon/signout.svelte";

  let {children, data,}: LayoutProps = $props();
</script>

<svelte:head>
    <title>Friday at Work</title>
    <link rel="icon" href="/icon16.png" type="image/png" sizes="16x16"/>
    <link rel="icon" href="/icon64.png" type="image/png" sizes="64x64"/>
    <link rel="icon" href="/icon128.png" type="image/png" sizes="128x128"/>
    <link rel="icon" href="/icon256.png" type="image/png" sizes="256x256"/>
    <link rel="icon" href="/icon512.png" type="image/png" sizes="512x512"/>
    <link rel="icon" href="/icon1024.png" type="image/png" sizes="1024x1024"/>
    <link rel="apple-touch-icon" href="/icon167.png" type="image/png" sizes="167x167"/>
    <link rel="apple-touch-icon" href="/icon180.png" type="image/png" sizes="180x180"/>
    <link rel="apple-touch-icon" href="/icon152.png" type="image/png" sizes="152x152"/>
    <link rel="apple-touch-icon" href="/icon120.png" type="image/png" sizes="120x120"/>
</svelte:head>

{#if data.isLoggedIn && data.hasWorkspace }
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
        <div class="flex items-start gap-4">
            <HeaderButton name="Workspace" href="/workspace">
                <IconWorkspace/>
            </HeaderButton>
            {#if data.isUserAdmin}
                <HeaderButton name="Config" href="/admin">
                    <IconSettings/>
                </HeaderButton>
            {/if}
            <HeaderButton name="Sign out" href="/signout" data-sveltekit-reload>
                <IconSignOut/>
            </HeaderButton>
        </div>
    </nav>
{/if}
<div class="container mx-auto mt-4">
    {@render children()}
</div>

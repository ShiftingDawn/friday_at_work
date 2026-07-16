<script lang="ts">
    import "./layout.css";
    import favicon from "$lib/assets/favicon.svg";
    import HeaderButton from "$lib/components/header_button.svelte";
    import IconHome from "$lib/icon/home.svelte";
    import IconPerson from "$lib/icon/person.svelte";
    import IconDrinks from "$lib/icon/drinks.svelte";
    import IconReceipt from "$lib/icon/receipt.svelte";
    import IconWorkspace from "$lib/icon/workspace.svelte";
    import IconSignOut from "$lib/icon/signout.svelte";

    let {children, data} = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon}/>
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
            <HeaderButton name="Receipt" href="/receipt">
                <IconReceipt/>
            </HeaderButton>
        </div>
        <div class="flex items-start gap-4">
            <HeaderButton name="Workspace" href="/workspace">
                <IconWorkspace/>
            </HeaderButton>
            <HeaderButton name="Sign out" href="/signout" data-sveltekit-reload>
                <IconSignOut/>
            </HeaderButton>
        </div>
    </nav>
{/if}
<div class="container mx-auto mt-4">
    {@render children()}
</div>

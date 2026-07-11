<script lang="ts">
    import "./layout.css";
    import favicon from "$lib/assets/favicon.svg";
    import HeaderButton from "$lib/components/header_button.svelte";
    import Icon from "$lib/components/icon.svelte";
    import iconHome from "$lib/assets/home.svg";
    import iconPerson from "$lib/assets/person.svg";
    import iconDrinks from "$lib/assets/drinks.svg";
    import iconReceipt from "$lib/assets/receipt.svg";

    let {children} = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon}/>
    <style>
        html, body {
            width: 100%;
            height: 100%;
        }
    </style>
</svelte:head>

<div class="w-full h-full bg-ctp-base text-ctp-text">
    <div class="container mx-auto">
        <header class="w-full flex justify-center sticky top-4">
            <nav class="flex gap-4 bg-ctp-crust p-4 rounded-full">
                <HeaderButton href="/">
                    <Icon icon={iconHome}/>
                </HeaderButton>
                <HeaderButton href="/people">
                    <Icon icon={iconPerson}/>
                </HeaderButton>
                <HeaderButton href="/drinks">
                    <Icon icon={iconDrinks}/>
                </HeaderButton>
                <HeaderButton href="/receipt">
                    <Icon icon={iconReceipt}/>
                </HeaderButton>
            </nav>
        </header>
        <div class="pt-8">
            {@render children()}
        </div>
    </div>
</div>

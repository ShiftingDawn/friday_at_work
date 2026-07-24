<script lang="ts">
  import type {LayoutProps} from "./$types";
  import Navbar from "./navbar.svelte";
  import "./layout.css";
  import Flash from "./flash.svelte";

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
  <link rel="shortcut icon" href="/icon152.png" type="image/png" sizes="152x152"/>
  <link rel="manifest" href="/manifest.webmanifest">
</svelte:head>

{#if data.isLoggedIn && data.hasWorkspace }
  <Navbar/>
{/if}
<div class="container mx-auto mt-4">
  {@render children()}
</div>
<Flash/>

<!-- eslint-disable @typescript-eslint/no-explicit-any  -->
<!-- eslint-disable-next-line @stylistic/quotes -->
<script lang="ts" generics="T extends import('svelte').Component<any> | keyof HTMLElementTagNameMap = 'button'">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import {twMerge} from "tailwind-merge";
  import type {Component, ComponentProps, Snippet} from "svelte";
  import Spinner from "./spinner.svelte";

  type Props = (
    T extends keyof HTMLElementTagNameMap
      ? svelteHTML.IntrinsicElements[T]
      : T extends Component<any>
        ? ComponentProps<T>
        : Record<string, any>
    ) & {
      as?: T;
      children?: Snippet;
    };

  let {
    as = "button" as any,
    class: cls,
    children,
    loading,
    disabled,
    icon: Icon,
    ...rest
  }: {
    loading?: boolean,
    disabled?: boolean,
    icon?: Component<any>,
  } & Props = $props();

</script>

<svelte:element this={as} disabled={disabled || loading} {...rest} class={twMerge(
  "bg-button text-button-text min-w-8 h-8 px-4 rounded-2xl cursor-pointer transition-all flex flex-row gap-2 items-center justify-center",
  "hover:bg-button-hover hover:text-button-hover-text hover:rounded-lg",
  disabled && "cursor-not-allowed bg-button-disabled hover:bg-button-disabled text-button-disabled-text hover:text-button-disabled-text hover:rounded-2xl",
  Icon && "h-12 rounded-4xl",
  Icon && disabled && "hover:rounded-4xl",
  cls as any
)}
>
  {#if !loading && Icon }
    <div class="w-8">
      <Icon/>
    </div>
  {:else}
    <div class="w-4">
      {#if loading}
        <Spinner class="border-2 w-4"/>
      {/if}
    </div>
  {/if}
  <span class="font-bold">{@render children?.()}</span>
  {#if !Icon}
    <div class="w-4"></div>
  {/if}
</svelte:element>

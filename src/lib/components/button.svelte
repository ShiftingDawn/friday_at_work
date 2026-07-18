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
    ...rest
  }: { loading?: boolean, disabled?: boolean } & Props = $props();

</script>

<svelte:element this={as} disabled={disabled || loading} {...rest}
                class={twMerge(
                  "bg-ctp-surface1 min-w-8 h-8 px-4 rounded-full cursor-pointer hover:bg-ctp-lavender hover:text-ctp-base transition-all flex flex-row gap-2 items-center justify-center",
                  (disabled || loading) && "hover:bg-ctp-unset hover:text-ctp-text cursor-not-allowed",
                  cls as any
                )}
>
    <div class="w-4">
        {#if loading}
            <Spinner class="border-2 w-4"/>
        {/if}
    </div>
    <span>{@render children?.()}</span>
    <div class="w-4"></div>
</svelte:element>

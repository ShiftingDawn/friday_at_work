<!-- eslint-disable @typescript-eslint/no-explicit-any  -->
<!-- eslint-disable-next-line @stylistic/quotes -->
<script lang="ts" generics="T extends import('svelte').Component<any> | keyof HTMLElementTagNameMap = 'div'">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import type {Component, ComponentProps, Snippet} from "svelte";
  import {fade} from "svelte/transition";
  import {twMerge} from "tailwind-merge";
  import Portal from "svelte-portal";

  type Props = (
    T extends keyof HTMLElementTagNameMap
      ? svelteHTML.IntrinsicElements[T]
      : T extends Component<any>
        ? ComponentProps<T>
        : Record<string, any>
    ) & {
      as?: T;
      open: boolean,
      onclose: () => void,
      canclose?: boolean,
      title?: string,
      class?: string,
      children: Snippet,
      actions?: Snippet
    };

  const {
    as = "button" as any,
    class: cls,
    open,
    onclose,
    canclose,
    title,
    children,
    actions,
    enhance,
    ...rest
  }: Props = $props();
</script>

<Portal target="#modalroot">
  <svelte:element this={as} class={twMerge(
    "hidden fixed z-40 inset-0 pointer-events-none items-end pb-16 md:pb-0 md:items-center lg:items-start lg:pt-16 justify-center backdrop-blur-none transition-all",
    open && "flex pointer-events-auto"
  )} formAction={enhance} {...rest}>
    {#if open}
      <button type="button" aria-label="Close dialog" onclick={canclose !== false ? onclose : undefined}
              class="absolute inset-0 backdrop-blur-xs" disabled={canclose === false}
      ></button>
      <div in:fade={{duration: 150,}} out:fade={{duration: 150,}}
           class={twMerge("relative min-w-xs bg-dialog text-dialog-text backdrop-blur-lg rounded-lg shadow-lg flex flex-col gap-2", cls)}
      >
        {#if title}
          <div class="text-xl font-bold uppercase bg-dialog-header text-dialog-header-text p-4 rounded-t-lg shadow-lg">
            {title}
          </div>
        {/if}
        <div class="p-4">
          {@render children()}
        </div>
        {#if actions}
          <div class="flex items-center gap-2 justify-end p-4 rounded-b-lg">
            {@render actions()}
          </div>
        {/if}
      </div>
    {/if}
  </svelte:element>
</Portal>

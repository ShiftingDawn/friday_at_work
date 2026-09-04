<!-- eslint-disable @typescript-eslint/no-explicit-any  -->
<!-- eslint-disable-next-line @stylistic/quotes -->
<script lang="ts" generics="T extends import('svelte').Component<any> | keyof HTMLElementTagNameMap = 'div'">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import type {Component, ComponentProps, Snippet} from "svelte";
  import {twMerge} from "tailwind-merge";

  type Props = (
    T extends keyof HTMLElementTagNameMap
      ? svelteHTML.IntrinsicElements[T]
      : T extends Component<any>
        ? ComponentProps<T>
        : Record<string, any>
    ) & {
      as?: T;
      back?: Snippet;
      action?: Snippet;
      children?: Snippet;
    };

  let {as = "div" as any, title, back, action, class: cls, children, ...rest}: Props = $props();
</script>

<svelte:element this={as} class={twMerge("bg-card text-card-text p-4 rounded-2xl shadow-lg backdrop-blur-md", cls)}
                {...rest}>
  <div class="flex flex-col gap-2">
    {#if back || title || action}
      <div class="flex items-center justify-between h-16 mb-2 bg-card-header text-card-header-text p-4 rounded-lg">
        <div class="flex items-center gap-2">
          {@render back?.()}
          {#if title}
            <span class="font-bold text-xl uppercase">{title}</span>
          {/if}
        </div>
        <div class="flex items-center gap-2">
          {@render action?.()}
        </div>
      </div>
    {/if}
    {@render children?.()}
  </div>
</svelte:element>

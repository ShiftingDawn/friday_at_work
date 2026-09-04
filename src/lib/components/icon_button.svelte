<!-- eslint-disable @typescript-eslint/no-explicit-any  -->
<!-- eslint-disable-next-line @stylistic/quotes -->
<script lang="ts" generics="T extends import('svelte').Component<any> | keyof HTMLElementTagNameMap = 'button'">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import {twMerge} from "tailwind-merge";
  import type {Component, ComponentProps, Snippet} from "svelte";

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

  let {as = "button" as any, class: cls, children, ...rest}: Props = $props();
</script>

<svelte:element this={as} {...rest} class={twMerge(
  "w-12 h-12 bg-button text-button-text rounded-[100%] hover:rounded-lg cursor-pointer transition-all flex items-center justify-center",
  "hover:bg-button-hover hover:text-button-hover-text",
  rest.disabled && "cursor-not-allowed bg-disabled hover:bg-disabled text-text hover:text-text",
  cls as any
)}>
  <div class="w-8 h-8">
    {@render children?.()}
  </div>
</svelte:element>

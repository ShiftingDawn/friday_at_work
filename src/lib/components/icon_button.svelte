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

<svelte:element this={as} {...rest}
                class={twMerge("w-12 h-12 bg-ctp-surface1 rounded-full cursor-pointer hover:bg-ctp-lavender hover:text-ctp-base transition-all flex items-center justify-center", cls as any)}
>
    <div class="w-8 h-8">
        {@render children?.()}
    </div>
</svelte:element>

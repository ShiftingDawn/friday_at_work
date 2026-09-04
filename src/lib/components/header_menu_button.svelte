<!-- eslint-disable @typescript-eslint/no-explicit-any  -->
<!-- eslint-disable-next-line @stylistic/quotes -->
<script lang="ts" generics="T extends import('svelte').Component<any> | keyof HTMLElementTagNameMap = 'a'">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import type {Component, ComponentProps, Snippet} from "svelte";
  import type {ResolvedPathname} from "$app/types";

  type Props = (
    T extends keyof HTMLElementTagNameMap
      ? svelteHTML.IntrinsicElements[T]
      : T extends Component<any>
        ? ComponentProps<T>
        : Record<string, any>
    ) & {
      as?: T;
      children: Snippet;
    };

  let {
    as = "a" as any,
    name,
    children,
    "data-sveltekit-reload": doReload,
    ...rest
  }: {
    name: string,
    href: ResolvedPathname,
    "data-sveltekit-reload"?: boolean
  } & Props = $props();
</script>

<li>
  <svelte:element
      this={as} {...rest} data-sveltekit-reload={doReload}
      class="flex items-center gap-4 px-4 py-2 first:pt-4 last:pb-4 hover:bg-button-hover hover:text-button-hover-text cursor-pointer w-52"
  >
    <div class="w-8 h-8">
      {@render children()}
    </div>
    <span class="font-bold whitespace-nowrap">{name}</span>
  </svelte:element>
</li>

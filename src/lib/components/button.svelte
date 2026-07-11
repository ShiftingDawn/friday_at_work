<script lang="ts" generics="T extends import('svelte').Component<any> | keyof HTMLElementTagNameMap = 'button'">
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

<svelte:element this={as}
                class={twMerge("bg-ctp-surface1 min-w-8 h-8 self-end px-4 rounded-full cursor-pointer hover:bg-ctp-lavender hover:text-ctp-base transition-all", cls as any)}
                {...rest}>
    {@render children?.()}
</svelte:element>
<script lang="ts" generics="T extends import('svelte').Component<any> | keyof HTMLElementTagNameMap = 'div'">
    import type {Component, ComponentProps, Snippet} from 'svelte';
    import {twMerge} from "tailwind-merge";

    type Props = {
        as?: T;
        children?: Snippet;
    } & (T extends keyof HTMLElementTagNameMap
        ? svelteHTML.IntrinsicElements[T]
        : T extends Component<any>
            ? ComponentProps<T>
            : Record<string, any>);

    let {as = 'div' as any, class: cls, children, ...rest}: Props = $props();
</script>

<svelte:element this={as} class={twMerge("bg-ctp-surface0 p-4 rounded-2xl shadow-lg", cls)} {...rest}>
    {@render children?.()}
</svelte:element>
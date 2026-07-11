<script lang="ts" generics="T extends import('svelte').Component<any> | keyof HTMLElementTagNameMap = 'div'">
    import type {Component, ComponentProps, Snippet} from 'svelte';
    import {twMerge} from "tailwind-merge";

    type Props = (
        T extends keyof HTMLElementTagNameMap
            ? svelteHTML.IntrinsicElements[T]
            : T extends Component<any>
                ? ComponentProps<T>
                : Record<string, any>
        ) & {
        as?: T;
        name?: Snippet;
        action?: Snippet;
        children?: Snippet;
    };

    let {as = 'div' as any, name, action, class: cls, children, ...rest}: Props = $props();
</script>

<svelte:element this={as} class={twMerge("bg-ctp-surface0 p-4 rounded-2xl shadow-lg", cls)} {...rest}>
    <div class="flex flex-col gap-2">
        {#if name || action}
            <div class="flex items-center justify-between">
                <div>
                    {#if name}
                        <span class="font-bold text-xl uppercase">{@render name()}</span>
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
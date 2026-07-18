<script lang="ts">
    import type {HTMLAttributes} from "svelte/elements";
    import {getStorageUrl} from "$lib/client/storage";
    import {twMerge} from "tailwind-merge";

    const {
        file,
        class: cls,
        ...rest
    }: {
        file: string;
    } & Omit<HTMLAttributes<HTMLImageElement>, "src"> = $props();
</script>

<!-- svelte-ignore hydration_attribute_changed -->
<img src={`${getStorageUrl(file)}?${new Date().getTime()}`} alt="" class={twMerge("w-32 aspect-square", cls as any)} {...rest}/>
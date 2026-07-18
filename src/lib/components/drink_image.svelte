<script lang="ts">
    import type {HTMLAttributes} from "svelte/elements";
    import {getStorageUrl} from "$lib/client/storage";
    import {twMerge} from "tailwind-merge";

    const {
      file,
      lastModified,
      class: cls,
      ...rest
    }: {
      file: string;
      lastModified: Date,
    } & Omit<HTMLAttributes<HTMLImageElement>, "src"> = $props();
</script>

<!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
<!-- svelte-ignore hydration_attribute_changed -->
<img src={`${getStorageUrl(file)}?lastmod=${lastModified.getTime()}`} alt="" {...rest}
     class={twMerge("w-32 aspect-square", cls as never)}/>

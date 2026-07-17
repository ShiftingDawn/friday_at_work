import {env} from "$env/dynamic/public";

export function getStorageUrl(file: string): string {
    let result = env.PUBLIC_S3_PUBLIC_URL;
    if (!result?.endsWith("/")) {
        result += "/";
    }
    return result + file;
}
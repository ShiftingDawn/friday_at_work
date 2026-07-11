import type {LayoutServerLoad} from "./$types";

export const load: LayoutServerLoad = ({locals}) => {
    return {
        authorized: locals.authorized,
    }
}
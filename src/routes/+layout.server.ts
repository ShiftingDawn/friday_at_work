import type {LayoutServerLoad} from "./$types";

export const load: LayoutServerLoad = ({locals}) => {
    return {
        isLoggedIn: Boolean(locals.user),
        username: locals.user?.username ?? null,
        userId: locals.user?.id ?? null,
        hasWorkspace: Boolean(locals.workspace),
        workspace: locals.workspace?.name ?? null,
    }
}
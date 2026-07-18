import type {LayoutServerLoad} from "./$types";
import {canAdmin, canWrite} from "$lib/server/permission";

export const load: LayoutServerLoad = ({locals,}) => {
  return {
    isLoggedIn: Boolean(locals.user),
    username: locals.user?.username ?? null,
    userId: locals.user?.id ?? null,
    hasWorkspace: Boolean(locals.workspace),
    workspace: locals.workspace?.name ?? null,
    workspaceId: locals.workspace?.id ?? null,
    role: locals.role,
    canWrite: canWrite(locals.role),
    canAdmin: canAdmin(locals.role),
  };
};

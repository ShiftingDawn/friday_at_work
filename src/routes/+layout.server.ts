import type {LayoutServerLoad} from "./$types";
import {hasAdminRole, hasWriteRole} from "$lib/server/permission";

export const load: LayoutServerLoad = async ({locals,}) => {
  return {
    isLoggedIn: Boolean(locals.user),
    username: locals.user?.username ?? null,
    userId: locals.user?.id ?? null,
    isUserAdmin: locals.user?.isAdmin ?? false,
    hasWorkspace: Boolean(locals.workspace),
    workspace: locals.workspace?.name ?? null,
    workspaceId: locals.workspace?.id ?? null,
    role: locals.role,
    canWrite: await hasWriteRole(locals),
    canAdmin: await hasAdminRole(locals),
  };
};

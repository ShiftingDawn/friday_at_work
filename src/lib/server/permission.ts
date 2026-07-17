import type {Permission} from "@/generated/prisma/enums";
import {getWorkspace, type Workspace} from "$lib/server/workspace";
import {prisma} from "$lib/server/db";

type WorkspaceRole = "OWNER" | Permission;

export async function getRole(userId: string, workspace: string | Workspace): Promise<WorkspaceRole> {
    const ws = typeof workspace === "string"
        ? await getWorkspace(userId, workspace)
        : workspace;
    if (!ws) return "READ";
    if (ws.ownerId === userId) {
        return "OWNER";
    } else {
        const permission = await prisma.workspacePermission.findFirst(({
            where: {
                workspaceId: ws.id,
                userId: userId
            }
        }));
        return permission!.permission;
    }
}

export function canWrite(role: WorkspaceRole): boolean {
    return role === "WRITE" || role === "ADMIN" || role === "OWNER";
}

export function canAdmin(role: WorkspaceRole): boolean {
    return role === "ADMIN" || role === "OWNER";
}
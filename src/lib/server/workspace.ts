import {Prisma} from "@/generated/prisma/client";
import type {RequestEvent} from "@sveltejs/kit";
import {env} from "$env/dynamic/private";
import {prisma} from "$lib/server/db";

export type Workspace = Prisma.WorkspaceGetPayload<{}>;

const WORKSPACE_COOKIE_NAME = "workspace";

export function setWorkspaceCookie(event: RequestEvent, sessionId: string) {
    event.cookies.set(WORKSPACE_COOKIE_NAME, sessionId, {
        secure: env.NODE_ENV !== "development",
        path: "/",
        sameSite: "strict",
        httpOnly: true,
    });
}

export function getWorkspaceId(event: RequestEvent): string | null {
    return event.cookies.get(WORKSPACE_COOKIE_NAME) ?? null;
}

export async function getWorkspace(userId: string, workspaceId: string): Promise<Workspace | null> {
    return prisma.workspace.findFirst({
        where: {
            id: workspaceId,
            OR: [
                {ownerId: userId},
                {permissions: {every: {userId: userId}}}
            ],
        }
    });
}
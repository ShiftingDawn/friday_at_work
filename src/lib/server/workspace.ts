import {Prisma} from "@/generated/prisma/client";
import type {Cookies, RequestEvent} from "@sveltejs/kit";
import {env} from "$env/dynamic/private";
import {prisma} from "$lib/server/db";

export type Workspace = Prisma.WorkspaceGetPayload<object>;

const WORKSPACE_COOKIE_NAME = "workspace";

export function setWorkspaceCookie(event: RequestEvent | Cookies, sessionId: string) {
  const cookies = Object.hasOwn(event, "cookies")
    ? (event as RequestEvent).cookies
    : event as Cookies;
  cookies.set(WORKSPACE_COOKIE_NAME, sessionId, {
    secure: env.NODE_ENV !== "development",
    path: "/",
    sameSite: "strict",
    httpOnly: true,
  });
}

export function getWorkspaceId(event: RequestEvent | Cookies): string | null {
  const cookies = Object.hasOwn(event, "cookies")
    ? (event as RequestEvent).cookies
    : event as Cookies;
  return cookies.get(WORKSPACE_COOKIE_NAME) ?? null;
}

export async function getWorkspace(userId: string, workspaceId: string): Promise<Workspace | null> {
  return prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      OR: [
        {ownerId: userId,},
        {permissions: {some: {userId: userId,},},},
      ],
    },
  });
}

import type {Permission} from "@/generated/prisma/enums";
import {getRequestEvent} from "$app/server";
import {invalid} from "@sveltejs/kit";
import {canAdmin, canWrite, getRole} from "$lib/server/permission";

export async function testFunctionRole(role: Permission, workspaceId?: string): Promise<ReturnType<typeof getRequestEvent>> {
  const event = getRequestEvent();
  if (!event.locals.user || !event.locals.workspace) {
    invalid("Unauthorized");
  }
  const r = await getRole(event.locals.user.id, workspaceId ?? event.locals.workspace.id);
  if (role === "ADMIN" && !canAdmin(r)) {
    invalid("Unauthorized");
  }
  if (role === "WRITE" && !canWrite(r)) {
    invalid("Unauthorized");
  }
  return event;
}

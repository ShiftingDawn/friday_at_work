import type {PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async ({params, locals,}) => {
  const permission = await prisma.workspacePermission.findFirst({
    where: {
      id: params.permission,
      OR: [
        {userId: locals.user!.id,},
        {workspace: {ownerId: locals.user!.id,},},
      ],
    },
    include: {
      workspace: {select: {ownerId: true,},},
      user: {select: {username: true,},},
    },
  });
  if (!permission) {
    return fail(404);
  }
  if (permission.workspace.ownerId !== locals.user!.id) {
    console.log("NOT_MINE");
  }
  return {permission,};
};

import type {PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";

export const load: PageServerLoad = async ({locals,}) => {
  return {
    workspaces: await prisma.workspace.findMany({
      where: {
        OR: [
          {ownerId: locals.user!.id,},
          {permissions: {some: {userId: locals.user!.id,},},},
        ],
      },
    }),
  };
};


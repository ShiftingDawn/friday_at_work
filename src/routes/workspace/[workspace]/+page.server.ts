import type {PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";

export const load: PageServerLoad = async ({params, locals,}) => {
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: params.workspace,
      OR: [
        {ownerId: locals.user!.id,},
        {permissions: {every: {userId: locals.user!.id,},},},
      ],
    },
    include: {permissions: {include: {user: {select: {username: true,},},},},},
  });
  return {ws: workspace,};
};

import type {PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";

export const load: PageServerLoad = async ({params, locals,}) => {
  return {
    drink: await prisma.drink.findFirst({
      where: {id: params.drink, workspaceId: locals.workspace!.id,},
      select: {
        id: true,
        name: true,
        restocks: {orderBy: {timestamp: "desc",},},
      },
    }),
  };
};

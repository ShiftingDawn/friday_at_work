import type {PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";

export const load: PageServerLoad = async ({locals,}) => {
  return {
    hiddenDrinkCount: await prisma.drink.count({
      where: {
        workspaceId: locals.workspace!.id,
        hidden: true,
      },
    }),
  };
};

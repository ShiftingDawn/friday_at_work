import type {PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";

export const load: PageServerLoad = async ({params, locals,}) => {
  const drink = await prisma.drink.findFirst({
    where: {
      id: params.drink,
      workspaceId: locals.workspace!.id,
    },
  });
  return {
    drink,
    restockCount: await prisma.restock.count({where: {drinkId: drink!.id,},}),
  };
};

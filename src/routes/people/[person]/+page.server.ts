import type {PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {fail} from "@sveltejs/kit";
import {hasAdminRole} from "$lib/server/permission";

export const load: PageServerLoad = async ({params, locals,}) => {
  const person = await prisma.person.findFirst({
    where: {
      id: params.person,
      workspaceId: locals.workspace!.id,
    },
    select: {
      id: true,
      name: true,
      reset: true,
      consumptions: {
        select: {
          drink: {select: {name: true,},},
          creator: {select: {username: true,},},
        },
      },
    },
  });
  if (!person) {
    return fail(404);
  }
  const allConsumptions = !(await hasAdminRole(locals)) ? null : await prisma.consumption.findMany({
    where: {personId: person.id,},
    orderBy: {timestamp: "desc",},
    include: {
      drink: {select: {name: true,},},
      creator: {select: {username: true,},},
    },
  });
  const consumptions = await prisma.consumption.groupBy({
    by: ["drinkId", "price",],
    where: {
      personId: person.id,
      ...(person.reset ? {timestamp: {gte: person.reset,},} : {}),
    },
    _count: {drinkId: true,},
  });
  const drinks = await prisma.drink.findMany({
    omit: {price: true,},
    where: {id: {in: consumptions.map(consumption => consumption.drinkId),},},
  });
  return {
    person,
    allConsumptions,
    consumptions: consumptions.map(consumption => ({
      drink: drinks.find(drink => drink.id === consumption.drinkId),
      price: consumption.price,
      count: consumption._count.drinkId,
    })),
  };
};

import type {PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";

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
  const creditHistorySize = await prisma.credit.count({where: {personId: person!.id,},});
  return {
    person,
    creditHistorySize,
  };
};

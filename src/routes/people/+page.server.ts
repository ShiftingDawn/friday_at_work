import type {PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";

export const load: PageServerLoad = async ({locals,}) => {
  return {
    people: await prisma.person.findMany({
      where: {workspaceId: locals.workspace!.id,},
      orderBy: {name: "asc",},
    }),
  };
};

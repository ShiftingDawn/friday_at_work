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
      _count: {select: {receipts: true,},},
    },
  });
  return {person, receiptCount: person!._count.receipts,};
};

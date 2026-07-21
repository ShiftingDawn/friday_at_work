import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";
import {canWrite, hasWriteRole} from "$lib/server/permission";

export const load: PageServerLoad = async ({locals,}) => {
  return {
    people: await prisma.person.findMany({where: {workspaceId: locals.workspace!.id,},}),
    drinks: await prisma.drink.findMany({
      where: {
        hidden: false,
        workspaceId: locals.workspace!.id,
      },
    }),
  };
};

export const actions = {
  default: async ({request, locals,}) => {
    if (!(await hasWriteRole(locals))) {
      return fail(403);
    }
    const {data, success, error,} = createScheme.safeParse(await request.formData());
    if (!success) {
      return fail(400);
    }
    const drink = await prisma.drink.findUnique({where: {id: data?.drink,},});
    if (!drink) {
      return fail(400);
    }
    await prisma.consumption.create({
      data: {
        workspaceId: locals.workspace!.id,
        personId: data?.person,
        drinkId: data?.drink,
        creatorId: locals.user!.id,
        price: drink.price,
      },
    });
  },
} satisfies Actions;

const createScheme = zfd.formData({
  person: zfd.text(z.uuid()),
  drink: zfd.text(z.uuid()),
});

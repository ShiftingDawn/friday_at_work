import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";
import {canAdmin, canWrite} from "$lib/server/permission";

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
  const allConsumptions = !canAdmin(locals.role) ? null : await prisma.consumption.findMany({
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

export const actions = {
  update: async ({request, params, locals,}) => {
    if (!canWrite(locals.role)) {
      return fail(403);
    }
    const person = await prisma.person.findUnique({
      where: {
        id: params.person,
        workspaceId: locals.workspace!.id,
      },
    });
    if (!person) {
      return fail(404);
    }
    const {data, success, error,} = updateScheme.safeParse(await request.formData());
    if (!success) {
      return fail(400);
    }
    await prisma.person.update({
      where: {id: person.id,},
      data: {name: data?.name,},
    });
  },
  resetconsumptions: async ({params, locals,}) => {
    if (!canAdmin(locals.role)) {
      return fail(403);
    }
    const person = await prisma.person.findUnique({
      where: {
        id: params.person,
        workspaceId: locals.workspace!.id,
      },
    });
    if (!person) {
      return fail(404);
    }
    await prisma.person.update({
      where: {id: person.id,},
      data: {reset: new Date(),},
    });
  },
} satisfies Actions;

const updateScheme = zfd.formData({name: zfd.text(z.string().trim().min(3)),});

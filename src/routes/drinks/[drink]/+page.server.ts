import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";
import {upload} from "$lib/server/storage";
import {canWrite, getRole} from "$lib/server/permission";
import {getWorkspace} from "$lib/server/workspace";

export const load: PageServerLoad = async ({params, locals,}) => {
  const [restocked, consumed,] = await Promise.all([
    prisma.restock.aggregate({
      where: {drinkId: params.drink,},
      _sum: {amount: true,},
    }),
    prisma.consumption.count({where: {workspaceId: locals.workspace!.id, drinkId: params.drink,},}),
  ]);
  return {
    drink: await prisma.drink.findFirst({where: {workspaceId: locals.workspace!.id, id: params.drink,},}),
    stock: (restocked._sum.amount ?? 0) - consumed,
    last_restock: await prisma.restock.findFirst({
      where: {drinkId: params.drink,},
      orderBy: {timestamp: "desc",},
    }),
  };
};

export const actions = {
  update: async ({request, params,}) => {
    const {data, success, error,} = updateScheme.safeParse(await request.formData());
    if (!success) {
      return fail(400);
    }
    await prisma.drink.update({
      data: {
        name: data?.name,
        price: data?.price,
      },
      where: {id: params.drink,},
    });
  },
  reskin: async ({request, params, locals,}) => {
    if (!canWrite(await getRole(locals.user!.id, locals.workspace!.id))) {
      return fail(403);
    }
    const workspace = await getWorkspace(locals.user!.id, locals.workspace!.id);
    if (!workspace) {
      return fail(404);
    }
    const {data, success, error,} = reskinScheme.safeParse(await request.formData());
    if (!success) {
      return fail(400);
    }
    await prisma.drink.update({
      where: {
        id: params.drink,
        workspaceId: workspace.id,
      },
      data: {modifiedAt: new Date(),},
    });
    if (data?.image) {
      await upload(data.image, params.drink, data.image.type);
    }
  },
  hide: async ({params,}) => {
    const current = await prisma.drink.findFirst({where: {id: params.drink,},});
    if (!current) {
      return fail(400);
    }
    await prisma.drink.update({
      where: {id: params.drink,},
      data: {hidden: !current.hidden,},
    });
  },
  restock: async ({request, params,}) => {
    const {data, success, error,} = restockScheme.safeParse(await request.formData());
    if (!success) {
      return fail(400);
    }
    await prisma.restock.create({
      data: {
        drinkId: params.drink,
        amount: data?.amount,
      },
    });
  },
} satisfies Actions;

const updateScheme = zfd.formData({
  name: zfd.text(z.string().min(3)),
  price: zfd.numeric(z.int().min(0)),
});

const reskinScheme = zfd.formData({image: zfd.file(),});

const restockScheme = zfd.formData({amount: zfd.numeric(z.int().min(1)),});

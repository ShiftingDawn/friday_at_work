import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";
import {upload} from "$lib/server/storage";
import {hasWriteRole} from "$lib/server/permission";
import {getWorkspace} from "$lib/server/workspace";

export const load: PageServerLoad = async ({params, locals,}) => {
  return {drink: await prisma.drink.findFirst({where: {workspaceId: locals.workspace!.id, id: params.drink,},}),};
};

export const actions = {
  update: async ({request, params, locals,}) => {
    if (!(await hasWriteRole(locals))) {
      return fail(403);
    }
    const {data, success, error,} = updateScheme.safeParse(await request.formData());
    if (!success) {
      return fail(400);
    }
    await prisma.drink.update({
      data: {
        name: data?.name,
        price: data?.price,
        modifiedAt: new Date(),
      },
      where: {id: params.drink,},
    });
  },
  reskin: async ({request, params, locals,}) => {
    if (!(await hasWriteRole(locals))) {
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
  hide: async ({params, locals,}) => {
    if (!(await hasWriteRole(locals))) {
      return fail(403);
    }
    const current = await prisma.drink.findFirst({where: {id: params.drink,},});
    if (!current) {
      return fail(400);
    }
    await prisma.drink.update({
      where: {id: params.drink,},
      data: {
        hidden: !current.hidden,
        modifiedAt: new Date(),
      },
    });
  },
} satisfies Actions;

const updateScheme = zfd.formData({
  name: zfd.text(z.string().trim().min(3)),
  price: zfd.numeric(z.int().min(0)),
  tint: zfd.text(z.string().regex(/^#[0-9a-f]{6}$/i, {message: "Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",})),
});

const reskinScheme = zfd.formData({image: zfd.file(),});

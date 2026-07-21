import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";
import {upload} from "$lib/server/storage";
import {hasWriteRole} from "$lib/server/permission";

export const load: PageServerLoad = async ({url, locals,}) => {
  const showHidden = new URLSearchParams(url.search).has("hidden", "true");
  return {
    drinks: await prisma.drink.findMany({
      where: {
        workspaceId: locals.workspace!.id,
        hidden: false,
      },
    }),
    hidden: showHidden ? await prisma.drink.findMany({
      where: {
        workspaceId: locals.workspace!.id,
        hidden: true,
      },
    }) : undefined,
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
    const drink = await prisma.drink.create({
      data: {
        workspaceId: locals.workspace!.id,
        name: data?.name,
        price: data?.price,
      },
    });
    if (data?.image) {
      await upload(data.image, drink.id, data.image.type);
    }
  },
} satisfies Actions;

const createScheme = zfd.formData({
  name: zfd.text(z.string().trim().min(3)),
  price: zfd.numeric(z.int().min(0)),
  image: zfd.file(z.instanceof(File).optional()),
});

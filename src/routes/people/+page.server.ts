import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async ({locals,}) => {
  return {people: await prisma.person.findMany({where: {workspaceId: locals.workspace!.id,},}),};
};

export const actions = {
  default: async ({request, locals,}) => {
    const {data, success, error,} = createScheme.safeParse(await request.formData());
    if (!success) {
      return fail(400);
    }
    await prisma.person.create({
      data: {
        workspaceId: locals.workspace!.id,
        name: data?.name,
      },
    });
  },
} satisfies Actions;

const createScheme = zfd.formData({name: zfd.text(z.string().trim().min(3)),});

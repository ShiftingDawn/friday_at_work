import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail, redirect} from "@sveltejs/kit";
import {setWorkspaceCookie} from "$lib/server/workspace";

export const load: PageServerLoad = async ({locals,}) => {
  return {
    workspaces: await prisma.workspace.findMany({
      where: {
        OR: [
          {ownerId: locals.user!.id,},
          {permissions: {some: {userId: locals.user!.id,},},},
        ],
      },
    }),
  };
};

export const actions = {
  create: async (event) => {
    const {data, success, error,} = createScheme.safeParse(await event.request.formData());
    if (!success) {
      return fail(400);
    }
    const workspace = await prisma.workspace.create({
      data: {
        ownerId: event.locals.user!.id,
        name: data?.name,
      },
    });
    if (!event.locals.workspace) {
      setWorkspaceCookie(event, workspace.id);
      return redirect(303, "/");
    }
  },
  select: async (event) => {
    const {data, success, error,} = selectSchema.safeParse(await event.request.formData());
    if (!success) {
      return fail(400);
    }
    setWorkspaceCookie(event, data?.workspace);
    return redirect(303, "/");
  },
} satisfies Actions;

const createScheme = zfd.formData({name: zfd.text(z.string().min(3)),});

const selectSchema = zfd.formData({workspace: zfd.text(z.uuid()),});

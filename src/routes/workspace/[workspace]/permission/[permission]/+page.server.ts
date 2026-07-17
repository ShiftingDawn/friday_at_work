import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {fail, redirect} from "@sveltejs/kit";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {getWorkspace} from "$lib/server/workspace";
import type {Permission} from "@/generated/prisma/enums";
import {canAdmin, getRole} from "$lib/server/permission";

export const load: PageServerLoad = async ({params, locals}) => {
    const permission = await prisma.workspacePermission.findFirst({
        where: {
            id: params.permission,
            OR: [
                {userId: locals.user!.id},
                {workspace: {ownerId: locals.user!.id}}
            ]
        },
        include: {
            workspace: {
                select: {
                    ownerId: true,
                }
            },
            user: {
                select: {
                    username: true,
                }
            }
        }
    });
    if (!permission) {
        return fail(404);
    }
    if (permission.workspace.ownerId !== locals.user!.id) {
        console.log("NOT_MINE")
    }
    return {
        permission,
    }
}

export const actions = {
    deletepermission: async ({params, locals}) => {
        if (!canAdmin(await getRole(locals.user!.id, params.workspace))) {
            return fail(403);
        }
        const workspace = await getWorkspace(locals.user!.id, params.workspace);
        if (!workspace) {
            return fail(404);
        }
        const permission = await prisma.workspacePermission.findFirst({
            where: {
                id: params.permission,
                workspaceId: workspace.id,
            }
        });
        if (!permission) {
            return fail(404);
        }
        await prisma.workspacePermission.delete({
            where: {id: permission.id}
        });
        return redirect(302, `/workspace/${params.workspace}`);
    },
    updatepermission: async ({request, params, locals}) => {
        if (!canAdmin(await getRole(locals.user!.id, params.workspace))) {
            return fail(403);
        }
        const {data, success, error} = updateScheme.safeParse(await request.formData());
        if (!success) {
            return fail(400);
        }
        const workspace = await getWorkspace(locals.user!.id, params.workspace);
        if (!workspace) {
            return fail(404);
        }
        const permission = await prisma.workspacePermission.findFirst({
            where: {
                id: params.permission,
                workspaceId: workspace.id,
            }
        });
        if (!permission) {
            return fail(404);
        }
        const role: Permission = data!.role === "admin"
            ? "ADMIN"
            : data!.role === "write"
                ? "WRITE"
                : "READ";
        await prisma.workspacePermission.update({
            where: {id: permission.id},
            data: {permission: role},
        });
    },
} satisfies Actions;

const updateScheme = zfd.formData({
    role: zfd.text(z.enum(["read", "write", "admin"])),
});
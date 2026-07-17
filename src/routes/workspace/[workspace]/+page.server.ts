import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {fail} from "@sveltejs/kit";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {getWorkspace} from "$lib/server/workspace";
import type {Permission} from "@/generated/prisma/enums";
import {canAdmin, getRole} from "$lib/server/permission";

export const load: PageServerLoad = async ({params, locals}) => {
    const workspace = await prisma.workspace.findFirst({
        where: {
            id: params.workspace,
            OR: [
                {ownerId: locals.user!.id},
                {permissions: {every: {userId: locals.user!.id}}}
            ],
        },
        include: {
            permissions: {
                include: {
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            },
        }
    });
    return {
        ws: workspace,
    }
}

export const actions = {
    update: async ({request, params, locals}) => {
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
        await prisma.workspace.update({
            data: {name: data!.name},
            where: {id: workspace.id}
        });
    },
    addpermission: async ({request, params, locals}) => {
        if (!canAdmin(await getRole(locals.user!.id, params.workspace))) {
            return fail(403);
        }
        const {data, success, error} = addPermissionScheme.safeParse(await request.formData());
        if (!success) {
            return fail(400);
        }
        const workspace = await getWorkspace(locals.user!.id, params.workspace);
        if (!workspace) {
            return fail(404);
        }
        const userToAdd = await prisma.user.findFirst({
            where: {username: data!.username}
        });
        if (!userToAdd) {
            return fail(404);
        }
        const role: Permission = data!.role === "admin"
            ? "ADMIN"
            : data!.role === "write"
                ? "WRITE"
                : "READ";
        await prisma.workspacePermission.create({
            data: {
                permission: role,
                userId: userToAdd.id,
                workspaceId: workspace.id,
            }
        });
    },
} satisfies Actions;

const updateScheme = zfd.formData({
    name: zfd.text(z.string().min(3)),
});

const addPermissionScheme = zfd.formData({
    username: zfd.text(z.string().min(3)),
    role: zfd.text(z.enum(["read", "write", "admin"])),
});
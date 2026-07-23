import * as v from "valibot";
import {command, form, getRequestEvent} from "$app/server";
import {prisma} from "$lib/server/db";
import {getWorkspace, setWorkspaceCookie} from "$lib/server/workspace";
import {testFunctionRole} from "$lib/functions/index";
import {fail, invalid} from "@sveltejs/kit";
import type {Permission} from "@/generated/prisma/enums";

export const createWorkspace = form(
  v.object({name: v.pipe(v.string(), v.trim(), v.minLength(3)),}),
  async ({name,}) => {
    const {locals, cookies,} = getRequestEvent();
    const workspace = await prisma.workspace.create({
      data: {
        ownerId: locals.user!.id,
        name,
      },
    });
    if (!locals.workspace) {
      setWorkspaceCookie(cookies, workspace.id);
    }
  }
);

export const selectWorkspace = command(v.pipe(v.string(), v.uuid()), async workspaceId => {
  const {cookies,} = getRequestEvent();
  setWorkspaceCookie(cookies, workspaceId);
});

export const updateWorkspace = form(
  v.object({name: v.pipe(v.string(), v.trim(), v.minLength(3)),}),
  async ({name,}) => {
    const {locals, params,} = await testFunctionRole("ADMIN");
    const workspace = await getWorkspace(locals.user!.id, params.workspace!);
    if (!workspace) {
      return invalid("Workspace not found");
    }
    await prisma.workspace.update({
      data: {name,},
      where: {id: workspace.id,},
    });
  }
);

export const addWorkspacePermission = form(
  v.object({
    username: v.pipe(v.string(), v.trim(), v.minLength(3)),
    role: v.picklist(["admin", "write", "read",]),
  }),
  async ({username, role,}) => {
    const {locals, params,} = await testFunctionRole("ADMIN");
    const workspace = await getWorkspace(locals.user!.id, params.workspace!);
    if (!workspace) {
      return invalid("Workspace not found");
    }
    const userToAdd = await prisma.user.findFirst({where: {username,},});
    if (!userToAdd) {
      return invalid("User not found");
    }
    const permission: Permission = role === "admin"
      ? "ADMIN"
      : role === "write"
        ? "WRITE"
        : "READ";
    await prisma.workspacePermission.create({
      data: {
        permission,
        userId: userToAdd.id,
        workspaceId: workspace.id,
      },
    });
  }
);

export const updateWorkspacePermission = form(
  v.object({role: v.picklist(["admin", "write", "read",]),}),
  async ({role,}) => {
    const {locals, params,} = await testFunctionRole("ADMIN");
    const workspace = await getWorkspace(locals.user!.id, params.workspace!);
    if (!workspace) {
      return invalid("Workspace not found");
    }
    const permission = await prisma.workspacePermission.findFirst({
      where: {
        id: params.permission,
        workspaceId: workspace.id,
      },
    });
    if (!permission) {
      return invalid("Permission not found");
    }
    const newRole: Permission = role === "admin"
      ? "ADMIN"
      : role === "write"
        ? "WRITE"
        : "READ";
    await prisma.workspacePermission.update({
      where: {id: permission.id,},
      data: {permission: newRole,},
    });
  }
);

export const deleteWorkspacePermission = command(async () => {
  const {locals, params,} = await testFunctionRole("ADMIN");
  const workspace = await getWorkspace(locals.user!.id, params.workspace!);
  if (!workspace) {
    return invalid("Workspace not found");
  }
  const permission = await prisma.workspacePermission.findFirst({
    where: {
      id: params.permission,
      workspaceId: workspace.id,
    },
  });
  if (!permission) {
    return invalid("Permission not found");
  }
  await prisma.workspacePermission.delete({where: {id: permission.id,},});
});

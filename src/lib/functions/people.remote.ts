import * as v from "valibot";
import {command, form, query} from "$app/server";
import {testFunctionRole} from "$lib/functions/index";
import {prisma} from "$lib/server/db";
import {invalid} from "@sveltejs/kit";

export const getPeople = query(async () => {
  const {locals,} = await testFunctionRole("READ");
  return prisma.person.findMany({
    where: {workspaceId: locals.workspace!.id,},
    orderBy: {name: "asc",},
  });
});

export const createPerson = form(
  v.object({name: v.pipe(v.string(), v.minLength(3), v.trim()),}),
  async ({name,}) => {
    const {locals,} = await testFunctionRole("WRITE");
    await prisma.person.create({
      data: {
        workspaceId: locals.workspace!.id,
        name: name,
      },
    });
  }
);

export const updatePerson = form(
  v.object({name: v.pipe(v.string(), v.minLength(3), v.trim()),}),
  async ({name,}) => {
    const {locals, params,} = await testFunctionRole("WRITE");
    const person = await prisma.person.findUnique({
      where: {
        id: params.person,
        workspaceId: locals.workspace!.id,
      },
    });
    if (!person) {
      invalid("Person not found");
    }
    await prisma.person.update({
      where: {id: person.id,},
      data: {name,},
    });
  }
);

export const resetPersonConsumptions = command(async () => {
  const {locals, params,} = await testFunctionRole("ADMIN");
  const person = await prisma.person.findUnique({
    where: {
      id: params.person,
      workspaceId: locals.workspace!.id,
    },
  });
  if (!person) {
    invalid("Person not found");
  }
  await prisma.person.update({
    where: {id: person.id,},
    data: {reset: new Date(),},
  });
});

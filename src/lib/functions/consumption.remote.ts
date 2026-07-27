import * as v from "valibot";
import {form, query} from "$app/server";
import {testFunctionRole} from "$lib/functions";
import {prisma} from "$lib/server/db";
import {invalid} from "@sveltejs/kit";

export const getPeopleForConsumption = query(async () => {
  const {locals,} = await testFunctionRole("WRITE");
  return prisma.person.findMany({
    where: {workspaceId: locals.workspace!.id,},
    orderBy: {name: "asc",},
  });
});

export const getDrinksForConsumption = query(async () => {
  const {locals,} = await testFunctionRole("WRITE");
  return prisma.drink.findMany({
    where: {
      hidden: false,
      workspaceId: locals.workspace!.id,
    },
    orderBy: {name: "asc",},
  });
});

export const addConsumption = form(
  v.object({
    person: v.pipe(v.string(), v.uuid()),
    drink: v.pipe(v.string(), v.uuid()),
  }),
  async ({person: personId, drink: drinkId,}) => {
    const {locals,} = await testFunctionRole("WRITE");
    const drink = await prisma.drink.findFirst({where: {id: drinkId,},});
    if (!drink) {
      invalid("Drink not found");
    }
    const person = await prisma.person.findFirst({where: {id: personId,},});
    if (!person) {
      invalid("Person not found");
    }
    await prisma.consumption.create({
      data: {
        workspaceId: locals.workspace!.id,
        personId: person.id,
        drinkId: drink.id,
        creatorId: locals.user!.id,
        price: drink.price,
      },
    });
  }
);

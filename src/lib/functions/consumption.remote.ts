import * as v from "valibot";
import {form, query} from "$app/server";
import {testFunctionRole} from "$lib/functions";
import {prisma} from "$lib/server/db";
import {invalid} from "@sveltejs/kit";

export const getDrinksUnderThreshold = query(async () => {
  const {locals,} = await testFunctionRole("READ");
  const drinks = await prisma.drink.findMany({
    where: {
      workspaceId: locals.workspace!.id,
      threshold: {not: null,},
      hidden: false,
    },
    include: {
      _count: {select: {consumptions: true,},},
      restocks: {select: {amount: true,},},
    },
  });
  return drinks.map(d => {
    const totalStock = d.restocks.reduce((a, b) => a + b.amount, 0);
    const totalConsumptions = d._count.consumptions ?? 0;
    return ({
      id: d.id,
      name: d.name,
      totalStock,
      totalConsumptions,
      threshold: d.threshold!,
      missingAmount: d.threshold! - (totalStock - totalConsumptions),
    });
  }).filter(d => d.missingAmount > 0);
});

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

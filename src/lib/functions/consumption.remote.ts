import * as v from "valibot";
import {form, query} from "$app/server";
import {testFunctionRole} from "$lib/functions";
import {prisma} from "$lib/server/db";
import {invalid} from "@sveltejs/kit";

export const getDrinksUnderThreshold = query(async () => {
  const {locals,} = await testFunctionRole("READ");
  const workspaceId = locals.workspace!.id;

  const [drinks, restocks, consumptions,] = await prisma.$transaction([
    prisma.drink.findMany({
      where: {
        workspaceId,
        threshold: {not: null,},
        hidden: false,
      },
      select: {
        id: true,
        name: true,
        threshold: true,
      },
    }),
    prisma.restock.groupBy({
      by: ["drinkId",],
      where: {drink: {workspaceId,},},
      _sum: {amount: true,},
    }),
    prisma.consumption.groupBy({
      by: ["drinkId",],
      where: {workspaceId,},
      _count: {drinkId: true,},
    }),
  ]);

  const stockMap = new Map(
    restocks.map(r => [r.drinkId, r._sum.amount ?? 0,])
  );
  const consumptionMap = new Map(
    consumptions.map(c => [c.drinkId, c._count.drinkId,])
  );
  return drinks.map(d => {
    const totalStock = stockMap.get(d.id) ?? 0;
    const totalConsumptions = consumptionMap.get(d.id) ?? 0;
    const missingAmount = d.threshold! - (totalStock - totalConsumptions);

    return {
      id: d.id,
      name: d.name,
      totalStock,
      totalConsumptions,
      threshold: d.threshold!,
      missingAmount,
    };
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

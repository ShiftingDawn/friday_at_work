import * as v from "valibot";
import {form, query} from "$app/server";
import {testFunctionRole} from "$lib/functions/index";
import {prisma} from "$lib/server/db";
import {bunfile} from "$lib/bunfile";
import {upload} from "$lib/server/storage";
import {invalid} from "@sveltejs/kit";

export const getVisibleDrinks = query(async () => {
  const {locals,} = await testFunctionRole("READ");
  return prisma.drink.findMany({
    where: {
      workspaceId: locals.workspace!.id,
      hidden: false,
    },
    orderBy: {name: "asc",},
  });
});

export const getHiddenDrinks = query(async () => {
  const {locals, url,} = await testFunctionRole("READ");
  const showHidden = new URLSearchParams(url.search).has("hidden", "true");
  return showHidden ? await prisma.drink.findMany({
    where: {
      workspaceId: locals.workspace!.id,
      hidden: true,
    },
  }) : undefined;
});

export const addDrink = form(
  v.object({
    name: v.pipe(v.string(), v.trim(), v.minLength(3)),
    price: v.pipe(v.number(), v.integer(), v.minValue(0)),
    image: v.optional(bunfile()),
  }),
  async ({name, price, image,}) => {
    const {locals,} = await testFunctionRole("WRITE");
    const drink = await prisma.drink.create({
      data: {
        workspaceId: locals.workspace!.id,
        name,
        price,
      },
    });
    if (image) {
      await upload(image, drink.id, image.type);
    }
  }
);

export const setDrinkThreshold = form(
  v.object({amount: v.pipe(v.number(), v.integer(), v.minValue(-1)),}),
  async ({amount,}) => {
    const {params,} = await testFunctionRole("WRITE");
    const drink = await prisma.drink.findFirst({where: {id: params.drink,},});
    if (!drink) {
      invalid("Drink not found");
    }
    await prisma.drink.update({
      where: {id: drink.id,},
      data: {threshold: amount === -1 ? null : amount,},
    });
  }
);

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

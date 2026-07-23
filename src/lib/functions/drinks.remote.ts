import * as v from "valibot";
import {form, query} from "$app/server";
import {testFunctionRole} from "$lib/functions/index";
import {prisma} from "$lib/server/db";
import {bunfile} from "$lib/bunfile";
import {upload} from "$lib/server/storage";

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

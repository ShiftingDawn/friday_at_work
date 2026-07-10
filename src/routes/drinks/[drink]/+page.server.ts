import type {Actions, PageServerLoad} from "./$types";
import {db} from "$lib/server/db";
import {eq} from "drizzle-orm";
import {drinksTable} from "$lib/server/db/schema";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    return await db.query.drinksTable.findFirst({where: eq(drinksTable.id, params.drink)});
}

export const actions = {
    update: async ({request, params}) => {
        const {data, success, error} = updateScheme.safeParse(await request.formData());
        if (!success) {
            return fail(400);
        }
        await db.update(drinksTable).set({
            name: data?.name,
            price: data?.price,
        }).where(eq(drinksTable.id, params.drink));
    },
    reskin: async ({request, params}) => {
        const {data, success, error} = reskinScheme.safeParse(await request.formData());
        if (!success) {
            return fail(400);
        }
        const imageBytes = await data?.image.bytes();
        const imageType = data.image.name.substring(data.image.name.lastIndexOf("."));
        await db.update(drinksTable).set({
            image: imageBytes ? `data:image/${imageType};base64,${imageBytes.toBase64()}` : null

        }).where(eq(drinksTable.id, params.drink));
    }
} satisfies Actions;

const updateScheme = zfd.formData({
    name: zfd.text(z.string().min(3)),
    price: zfd.numeric(z.int().min(0)),
});

const reskinScheme = zfd.formData({
    image: zfd.file(),
});
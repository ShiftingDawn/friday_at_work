import type {Actions, PageServerLoad} from "./$types";
import {db} from "$lib/server/db";
import {drinksTable} from "$lib/server/db/schema.ts";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    return {
        drinks: await db.select().from(drinksTable)
    };
}

export const actions = {
    default: async ({request}) => {
        const {data, success, error} = createScheme.safeParse(await request.formData());
        if (!success) {
            return fail(400);
        }
        await db.insert(drinksTable).values({
            name: data?.name,
            price: data?.price
        });
    }
} satisfies Actions;

const createScheme = zfd.formData({
    name: zfd.text(z.string().min(3)),
    price: zfd.numeric(z.int().min(0)),
})
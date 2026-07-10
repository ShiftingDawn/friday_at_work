import type {Actions, PageServerLoad} from "./$types";
import {db} from "$lib/server/db";
import {drinksTable} from "$lib/server/db/schema";
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
        console.log(error);
        if (!success) {
            return fail(400);
        }
        const imageBytes = data?.image ? await data?.image?.bytes() : null;
        const imageType = data?.image && data.image.name.lastIndexOf(".") >= data.image.name.length - 5
            ? data.image.name.substring(data.image.name.lastIndexOf(".")) : null;
        await db.insert(drinksTable).values({
            name: data?.name,
            price: data?.price,
            image: imageBytes ? `data:image/${imageType};base64,${imageBytes.toBase64()}` : null
        });
    }
} satisfies Actions;

const createScheme = zfd.formData({
    name: zfd.text(z.string().min(3)),
    price: zfd.numeric(z.int().min(0)),
    image: zfd.file().optional(),
})
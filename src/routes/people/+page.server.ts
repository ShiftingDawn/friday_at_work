import type {Actions, PageServerLoad} from "./$types";
import {db} from "$lib/server/db";
import {personTable} from "$lib/server/db/schema";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    return {
        people: await db.select().from(personTable)
    };
}

export const actions = {
    default: async ({request}) => {
        const {data, success, error} = createScheme.safeParse(await request.formData());
        if (!success) {
            return fail(400);
        }
        await db.insert(personTable).values({name: data?.name});
    }
} satisfies Actions;

const createScheme = zfd.formData({
    name: zfd.text(z.string().min(3)),
});
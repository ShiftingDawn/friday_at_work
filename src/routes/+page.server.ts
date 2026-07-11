import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        people: await prisma.person.findMany(),
        drinks: await prisma.drink.findMany(),
    };
}

export const actions = {
    default: async ({request}) => {
        const {data, success, error} = createScheme.safeParse(await request.formData());
        console.log({data, success, error});
        if (!success) {
            return fail(400);
        }
        await prisma.consumption.create({
            data: {
                personId: data?.person,
                drinkId: data?.drink
            }
        });
    }
} satisfies Actions;

const createScheme = zfd.formData({
    person: zfd.text(z.uuid()),
    drink: zfd.text(z.uuid()),
});
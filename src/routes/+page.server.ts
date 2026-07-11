import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        people: await prisma.person.findMany(),
        drinks: await prisma.drink.findMany({where: {hidden: false}}),
    };
}

export const actions = {
    default: async ({request}) => {
        const {data, success, error} = createScheme.safeParse(await request.formData());
        if (!success) {
            return fail(400);
        }
        const drink = await prisma.drink.findUnique({
            where: {id: data?.drink}
        });
        if (!drink) {
            return fail(400);
        }
        await prisma.consumption.create({
            data: {
                personId: data?.person,
                drinkId: data?.drink,
                price: drink.price
            }
        });
    }
} satisfies Actions;

const createScheme = zfd.formData({
    person: zfd.text(z.uuid()),
    drink: zfd.text(z.uuid()),
});
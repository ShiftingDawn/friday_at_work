import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    return {
        people: await prisma.person.findMany()
    };
}

export const actions = {
    default: async ({request}) => {
        const {data, success, error} = createScheme.safeParse(await request.formData());
        if (!success) {
            return fail(400);
        }
        await prisma.person.create({data: {name: data?.name}});
    }
} satisfies Actions;

const createScheme = zfd.formData({
    name: zfd.text(z.string().min(3)),
});
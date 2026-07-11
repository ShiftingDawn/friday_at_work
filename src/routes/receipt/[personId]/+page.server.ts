import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    const person = await prisma.person.findUnique({
        where: {id: params.personId},
        select: {
            id: true,
            name: true,
            consumptions: {select: {drink: {omit: {image: true}}}}
        },
    });
    if (!person) {
        return fail(404);
    }
    const consumptions = await prisma.consumption.groupBy({
        by: ["drinkId"],
        where: {personId: person.id},
        _count: {drinkId: true}
    });
    const drinks = await prisma.drink.findMany({
        where: {
            id: {
                in: consumptions.map(consumption => consumption.drinkId)
            }
        },
    });
    return {
        person,
        consumptions: consumptions.map(consumption => ({
            drink: drinks.find(drink => drink.id === consumption.drinkId),
            count: consumption._count.drinkId,
        })),
    };
}

export const actions = {
    default: async ({params}) => {
        const person = await prisma.person.findUnique({
            where: {id: params.personId},
        });
    }
} satisfies Actions;
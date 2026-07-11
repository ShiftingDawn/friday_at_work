import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    const person = await prisma.person.findUnique({
        where: {id: params.personId},
        select: {
            id: true,
            name: true,
            reset: true,
            consumptions: {select: {drink: {select: {name: true}}}}
        },
    });
    if (!person) {
        return fail(404);
    }
    const consumptions = await prisma.consumption.groupBy({
        by: ["drinkId", "price"],
        where: {
            personId: person.id,
            ...(person.reset ? {timestamp: {gte: person.reset}} : {})
        },
        _count: {drinkId: true}
    });
    const drinks = await prisma.drink.findMany({
        omit: {price: true},
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
            price: consumption.price,
            count: consumption._count.drinkId,
        })),
    };
}

export const actions = {
    default: async ({params}) => {
        const person = await prisma.person.findUnique({
            where: {id: params.personId},
        });
        if (!person) {
            return fail(404);
        }
        await prisma.person.update({
            data: {reset: new Date()},
            where: {id: person.id}
        });
    }
} satisfies Actions;
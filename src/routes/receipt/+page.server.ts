import type {PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";

export const load: PageServerLoad = async () => {
    return {
        consumption: await prisma.person.findMany({
            select: {id: true, name: true, _count: {select: {consumptions: true}}}
        }),
    }
}
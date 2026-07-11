import type {PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";

export const load: PageServerLoad = async () => {
    return {
        consumption: (await prisma.person.findMany({
            select: {id: true, name: true, reset: true, consumptions: {select: {timestamp: true}}}
        }))
            .map(person => ({
                id: person.id,
                name: person.name,
                count: person.consumptions.filter(
                    consumption => !person.reset || consumption.timestamp >= person.reset
                ).length
            }))
            .filter(person => person.count)
            .sort((a, b) => b.count - a.count),
    }
}
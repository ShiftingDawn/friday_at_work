import {query} from "$app/server";
import {prisma} from "$lib/server/db";
import {getLastWeekStartDate, getWeekStartDate} from "$lib";

export const getWeeklyTopDrinkers = query(async () => {
  const people = await prisma.person.findMany({
    include: {_count: {select: {consumptions: {where: {timestamp: {gt: getWeekStartDate(),},},},},},},
    orderBy: {consumptions: {_count: "desc",},},
    where: {consumptions: {some: {timestamp: {gt: getWeekStartDate(),},},},},
  });
  return people.map(person => ({
    id: person.id,
    name: person.name,
    amount: person._count.consumptions,
  }));
});
export const getLastWeekTopDrinkers = query(async () => {
  const people = await prisma.person.findMany({
    include: {
      _count: {
        select: {
          consumptions: {
            where: {
              timestamp: {
                gt: getLastWeekStartDate(),
                lt: getWeekStartDate(),
              },
            },
          },
        },
      },
    },
    orderBy: {consumptions: {_count: "desc",},},
    where: {
      consumptions: {
        some: {
          timestamp: {
            gt: getLastWeekStartDate(),
            lt: getWeekStartDate(),
          },
        },
      },
    },
  });
  return people.map(person => ({
    id: person.id,
    name: person.name,
    amount: person._count.consumptions,
  }));
});

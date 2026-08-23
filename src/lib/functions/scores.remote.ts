import {query} from "$app/server";
import {prisma} from "$lib/server/db";
import {getLastMonthStartDate, getLastWeekStartDate, getMonthStartDate, getWeekStartDate} from "$lib";

export const getWeeklyTopDrinkers = query(async () => {
  const people = await prisma.person.findMany({
    include: {_count: {select: {consumptions: {where: {timestamp: {gt: getWeekStartDate(),},},},},},},
    where: {consumptions: {some: {timestamp: {gt: getWeekStartDate(),},},},},
  });
  return people
    .sort((o1, o2) => o2._count.consumptions - o1._count.consumptions)
    .map(person => ({
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
  return people
    .sort((o1, o2) => o2._count.consumptions - o1._count.consumptions)
    .map(person => ({
      id: person.id,
      name: person.name,
      amount: person._count.consumptions,
    }));
});

export const getMonthlyTopDrinkers = query(async () => {
  const people = await prisma.person.findMany({
    include: {_count: {select: {consumptions: {where: {timestamp: {gt: getMonthStartDate(),},},},},},},
    where: {consumptions: {some: {timestamp: {gt: getMonthStartDate(),},},},},
  });
  return people
    .sort((o1, o2) => o2._count.consumptions - o1._count.consumptions)
    .map(person => ({
      id: person.id,
      name: person.name,
      amount: person._count.consumptions,
    }));
});
export const getLastMonthTopDrinkers = query(async () => {
  const people = await prisma.person.findMany({
    include: {
      _count: {
        select: {
          consumptions: {
            where: {
              timestamp: {
                gt: getLastMonthStartDate(),
                lt: getMonthStartDate(),
              },
            },
          },
        },
      },
    },
    where: {
      consumptions: {
        some: {
          timestamp: {
            gt: getLastMonthStartDate(),
            lt: getLastMonthStartDate(),
          },
        },
      },
    },
  });
  return people
    .sort((o1, o2) => o2._count.consumptions - o1._count.consumptions)
    .map(person => ({
      id: person.id,
      name: person.name,
      amount: person._count.consumptions,
    }));
});

export const getWeeklyTopDrinks = query(async () => {
  const drinks = await prisma.drink.findMany({
    include: {_count: {select: {consumptions: {where: {timestamp: {gt: getWeekStartDate(),},},},},},},
    where: {consumptions: {some: {timestamp: {gt: getWeekStartDate(),},},},},
  });
  return drinks
    .sort((o1, o2) => o2._count.consumptions - o1._count.consumptions)
    .map(drink => ({
      id: drink.id,
      name: drink.name,
      amount: drink._count.consumptions,
    }));
});
export const getLastWeekTopDrinks = query(async () => {
  const drinks = await prisma.drink.findMany({
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
  return drinks
    .sort((o1, o2) => o2._count.consumptions - o1._count.consumptions)
    .map(drink => ({
      id: drink.id,
      name: drink.name,
      amount: drink._count.consumptions,
    }));
});

export const getMonthlyTopDrinks = query(async () => {
  const drinks = await prisma.drink.findMany({
    include: {_count: {select: {consumptions: {where: {timestamp: {gt: getMonthStartDate(),},},},},},},
    where: {consumptions: {some: {timestamp: {gt: getMonthStartDate(),},},},},
  });
  return drinks
    .sort((o1, o2) => o2._count.consumptions - o1._count.consumptions)
    .map(drink => ({
      id: drink.id,
      name: drink.name,
      amount: drink._count.consumptions,
    }));
});
export const getLastMonthTopDrinks = query(async () => {
  const drinks = await prisma.drink.findMany({
    include: {
      _count: {
        select: {
          consumptions: {
            where: {
              timestamp: {
                gt: getLastMonthStartDate(),
                lt: getMonthStartDate(),
              },
            },
          },
        },
      },
    },
    where: {
      consumptions: {
        some: {
          timestamp: {
            gt: getLastMonthStartDate(),
            lt: getMonthStartDate(),
          },
        },
      },
    },
  });
  return drinks
    .sort((o1, o2) => o2._count.consumptions - o1._count.consumptions)
    .map(drink => ({
      id: drink.id,
      name: drink.name,
      amount: drink._count.consumptions,
    }));
});

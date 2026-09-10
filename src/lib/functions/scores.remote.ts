import {query} from "$app/server";
import {prisma} from "$lib/server/db";
import {getLastMonthStartDate, getLastWeekStartDate, getMonthStartDate, getWeekStartDate} from "$lib";
import {testFunctionRole} from "$lib/functions";

export const getWeeklyTopDrinkers = query(async () => {
  const {locals,} = await testFunctionRole("READ");
  const people = await prisma.person.findMany({
    include: {_count: {select: {consumptions: {where: {timestamp: {gt: getWeekStartDate(),},},},},},},
    where: {
      workspaceId: locals.workspace!.id,
      consumptions: {some: {timestamp: {gt: getWeekStartDate(),},},},
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
export const getLastWeekTopDrinkers = query(async () => {
  const {locals,} = await testFunctionRole("READ");
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
      workspaceId: locals.workspace!.id,
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
  const {locals,} = await testFunctionRole("READ");
  const people = await prisma.person.findMany({
    include: {_count: {select: {consumptions: {where: {timestamp: {gt: getMonthStartDate(),},},},},},},
    where: {workspaceId: locals.workspace!.id, consumptions: {some: {timestamp: {gt: getMonthStartDate(),},},},},
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
  const {locals,} = await testFunctionRole("READ");
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
      workspaceId: locals.workspace!.id,
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
  return people
    .sort((o1, o2) => o2._count.consumptions - o1._count.consumptions)
    .map(person => ({
      id: person.id,
      name: person.name,
      amount: person._count.consumptions,
    }));
});

export const getWeeklyTopSpenders = query(async () => {
  const {locals,} = await testFunctionRole("READ");
  const people = await prisma.person.findMany({
    include: {consumptions: {select: {price: true,}, where: {timestamp: {gt: getWeekStartDate(),},},},},
    where: {workspaceId: locals.workspace!.id, consumptions: {some: {timestamp: {gt: getWeekStartDate(),},},},},
  });
  return people
    .map(person => ({...person, spent: person.consumptions.reduce((a, b) => a + b.price, 0),}))
    .sort((o1, o2) => o2.spent - o1.spent)
    .map(person => ({
      id: person.id,
      name: person.name,
      amount: person.spent,
    }));
});
export const getLastWeekTopSpenders = query(async () => {
  const {locals,} = await testFunctionRole("READ");
  const people = await prisma.person.findMany({
    include: {
      consumptions: {
        select: {price: true,},
        where: {
          timestamp: {
            gt: getLastWeekStartDate(),
            lt: getWeekStartDate(),
          },
        },
      },
    },
    where: {
      workspaceId: locals.workspace!.id,
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
    .map(person => ({...person, spent: person.consumptions.reduce((a, b) => a + b.price, 0),}))
    .sort((o1, o2) => o2.spent - o1.spent)
    .map(person => ({
      id: person.id,
      name: person.name,
      amount: person.spent,
    }));
});

export const getMonthlyTopSpenders = query(async () => {
  const {locals,} = await testFunctionRole("READ");
  const people = await prisma.person.findMany({
    include: {consumptions: {select: {price: true,}, where: {timestamp: {gt: getMonthStartDate(),},},},},
    where: {workspaceId: locals.workspace!.id, consumptions: {some: {timestamp: {gt: getMonthStartDate(),},},},},
  });
  return people
    .map(person => ({...person, spent: person.consumptions.reduce((a, b) => a + b.price, 0),}))
    .sort((o1, o2) => o2.spent - o1.spent)
    .map(person => ({
      id: person.id,
      name: person.name,
      amount: person.spent,
    }));
});
export const getLastMonthTopSpenders = query(async () => {
  const {locals,} = await testFunctionRole("READ");
  const people = await prisma.person.findMany({
    include: {
      consumptions: {
        select: {price: true,},
        where: {
          timestamp: {
            gt: getLastMonthStartDate(),
            lt: getMonthStartDate(),
          },
        },
      },
    },
    where: {
      workspaceId: locals.workspace!.id,
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
  return people
    .map(person => ({...person, spent: person.consumptions.reduce((a, b) => a + b.price, 0),}))
    .sort((o1, o2) => o2.spent - o1.spent)
    .map(person => ({
      id: person.id,
      name: person.name,
      amount: person.spent,
    }));
});

export const getWeeklyTopDrinks = query(async () => {
  const {locals,} = await testFunctionRole("READ");
  const drinks = await prisma.drink.findMany({
    include: {_count: {select: {consumptions: {where: {timestamp: {gt: getWeekStartDate(),},},},},},},
    where: {workspaceId: locals.workspace!.id, consumptions: {some: {timestamp: {gt: getWeekStartDate(),},},},},
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
  const {locals,} = await testFunctionRole("READ");
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
      workspaceId: locals.workspace!.id,
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
  const {locals,} = await testFunctionRole("READ");
  const drinks = await prisma.drink.findMany({
    include: {_count: {select: {consumptions: {where: {timestamp: {gt: getMonthStartDate(),},},},},},},
    where: {workspaceId: locals.workspace!.id, consumptions: {some: {timestamp: {gt: getMonthStartDate(),},},},},
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
  const {locals,} = await testFunctionRole("READ");
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
      workspaceId: locals.workspace!.id,
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

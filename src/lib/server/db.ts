import {PrismaLibSql} from "@prisma/adapter-libsql";
import {Prisma, PrismaClient} from "@/generated/prisma/client";
import {env} from "$env/dynamic/private";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = new PrismaLibSql({url: env.DATABASE_URL,});
export const prisma = globalForPrisma.prisma ?? new PrismaClient({adapter,});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export type User = Prisma.UserGetPayload<object>;
export type Session = Prisma.SessionGetPayload<object>;

import {PrismaLibSql} from "@prisma/adapter-libsql";
import {PrismaClient} from "@/generated/prisma/client";
import {DATABASE_URL} from "$env/static/private";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = new PrismaLibSql({url: DATABASE_URL});
export const prisma = globalForPrisma.prisma ?? new PrismaClient({adapter});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
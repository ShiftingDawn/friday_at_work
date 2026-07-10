import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";

export const personTable = sqliteTable("person", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
});

export const drinksTable = sqliteTable("drinks", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    price: integer("price").notNull(),
});

import * as v from "valibot";
import {form} from "$app/server";
import {prisma} from "$lib/server/db";
import {hashPassword} from "$lib/server/auth";

export const adminCreateUser = form(
  v.object({
    username: v.pipe(v.string(), v.trim(), v.minLength(3), v.maxLength(24), v.regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, dashes and underscores")),
    _password: v.pipe(v.string(), v.minLength(8), v.maxLength(255)),
    admin: v.pipe(v.optional(v.string()), v.transform(str => str === "on")),
  }),
  async ({username, _password, admin,}) => {
    return await prisma.user.create({
      data: {
        username,
        password: hashPassword(_password),
        isAdmin: admin,
      },
    });
  }
);

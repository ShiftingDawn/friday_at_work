import * as v from "valibot";
import {form, getRequestEvent} from "$app/server";
import {prisma} from "$lib/server/db";
import {invalid} from "@sveltejs/kit";
import {checkPassword, createSession} from "$lib/server/auth";

export const signIn = form(
  v.object({
    username: v.pipe(v.string(), v.minLength(3), v.maxLength(24), v.regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, dashes and underscores")),
    password: v.pipe(v.string(), v.minLength(8), v.maxLength(255)),
  }),
  async ({username, password,}, issue) => {
    const user = await prisma.user.findFirst({where: {username,},});
    if (!user) {
      invalid(issue.username("Invalid username"));

    }
    if (!checkPassword(password, user.password)) {
      invalid(issue.password("Invalid password"));
    }
    const {cookies,} = getRequestEvent();
    await createSession(cookies, user.id);
  }
);

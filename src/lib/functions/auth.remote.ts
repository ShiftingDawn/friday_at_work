import * as v from "valibot";
import {form, getRequestEvent} from "$app/server";
import {prisma} from "$lib/server/db";
import {invalid, redirect} from "@sveltejs/kit";
import {checkPassword, createSession, hashPassword} from "$lib/server/auth";
import {env} from "$env/dynamic/private";

export const signIn = form(
  v.object({
    username: v.pipe(v.string(), v.trim(), v.minLength(3), v.maxLength(24), v.regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, dashes and underscores")),
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

export const signUp = form(
  v.object({
    username: v.pipe(v.string(), v.trim(), v.minLength(3), v.maxLength(24), v.regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, dashes and underscores")),
    password: v.pipe(v.string(), v.minLength(8), v.maxLength(255)),
    password2: v.pipe(v.string(), v.minLength(8), v.maxLength(255)),
  }),
  async ({username, password, password2,}, issues) => {
    if (env.DISABLE_REGISTER === "true") {
      redirect(307, "/signin");
    }
    if (password !== password2) {
      invalid(issues.password2("Passwords do not match"));
    }
    try {
      const hasUsers = await prisma.user.count() > 0;
      const user = await prisma.user.create({
        data: {
          username,
          password: hashPassword(password),
          isAdmin: !hasUsers,
        },
      });
      const {cookies,} = getRequestEvent();
      await createSession(cookies, user.id);
    } catch (error) {
      console.error(error);
      invalid("An error has occurred");
    }
  }
);

import * as auth from "$lib/server/auth";
import {hashPassword, isValidPassword, isValidUsername} from "$lib/server/auth";
import {fail, redirect} from "@sveltejs/kit";
import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {env} from "$env/dynamic/private";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(302, "/");
  }
  if (env.DISABLE_REGISTER === "true") {
    return redirect(307, "/signin");
  }
  return {};
};

export const actions: Actions = {
  default: async (event) => {
    if (env.DISABLE_REGISTER === "true") {
      return redirect(307, "/signin");
    }
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    const password2 = formData.get("password2");

    if (!isValidUsername(username)) {
      return fail(400, {message: "Invalid username",});
    }
    if (!isValidPassword(password)) {
      return fail(400, {message: "Invalid password",});
    }
    if (password !== password2) {
      return fail(400, {message: "Passwords do not match",});
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
      const session = await auth.createSession(event, user.id);
      auth.setSessionTokenCookie(event, session.id, session.expiresAt);
    } catch (error) {
      console.error(error);
      return fail(500, {message: "An error has occurred",});
    }
    return redirect(302, "/");
  },
};

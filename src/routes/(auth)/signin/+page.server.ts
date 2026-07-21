import * as auth from "$lib/server/auth";
import {checkPassword, isValidPassword, isValidUsername} from "$lib/server/auth";
import {fail, redirect} from "@sveltejs/kit";
import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {env} from "$env/dynamic/private";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(302, "/");
  }
  return {canRegister: env.DISABLE_REGISTER !== "true",};
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (!isValidUsername(username)) {
      return fail(400, {message: "Invalid username (min 3, max 24 characters, alphanumeric only)",});
    }
    if (!isValidPassword(password)) {
      return fail(400, {message: "Invalid password (min 8, max 255 characters)",});
    }

    const user = await prisma.user.findFirst({where: {username,},});
    if (!user || !checkPassword(password, user.password)) {
      return fail(400, {message: "Incorrect username or password",});
    }

    const session = await auth.createSession(event, user.id);
    auth.setSessionTokenCookie(event, session.id, session.expiresAt);
    return redirect(302, "/");
  },
};

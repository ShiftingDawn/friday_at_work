import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {fail} from "@sveltejs/kit";
import {hashSync} from "bcrypt";

export const load: PageServerLoad = async () => {
  return {users: await prisma.user.findMany({include: {_count: {select: {workspaces: true,},},},}),};
};

export const actions: Actions = {
  createuser: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    const admin = formData.get("admin") === "on";

    if (!validateUsername(username)) {
      return fail(400, {message: "Invalid username",});
    }
    if (!validatePassword(password)) {
      return fail(400, {message: "Invalid password",});
    }
    try {
      await prisma.user.create({
        data: {
          username,
          password: hashSync(password, 12),
          isAdmin: admin,
        },
      });
    } catch (error) {
      console.error(error);
      return fail(500, {message: "An error has occurred",});
    }
  },
};

function validateUsername(username: unknown): username is string {
  return typeof username === "string" && username.length >= 3 && username.length <= 24 && /^[a-z0-9_-]+$/.test(username);
}

function validatePassword(password: unknown): password is string {
  return typeof password === "string" && password.length >= 8 && password.length <= 255;
}

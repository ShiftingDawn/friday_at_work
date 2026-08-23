import type {Actions} from "./$types";
import {fail} from "@sveltejs/kit";
import {prisma} from "$lib/server/db";
import {checkPassword, hashPassword, isValidPassword} from "$lib/server/auth";

export const actions = {
  default: async ({locals, request,}) => {
    const formData = await request.formData();

    const oldPassword = formData.get("oldpassword");
    if (!checkPassword(String(oldPassword), locals.user!.password)) {
      return fail(401, {message: "Incorrect old password",});
    }

    const password = formData.get("password");
    const password2 = formData.get("password2");
    if (!isValidPassword(password)) {
      return fail(400, {message: "Invalid new password",});
    }
    if (password !== password2) {
      return fail(400, {message: "New passwords do not match",});
    }

    await prisma.user.update({
      where: {id: locals.user!.id,},
      data: {password: hashPassword(password),},
    });
  },
} satisfies Actions;

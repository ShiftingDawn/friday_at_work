import {redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";
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

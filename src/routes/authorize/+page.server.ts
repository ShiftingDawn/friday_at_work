import type {Actions} from "./$types";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail, redirect} from "@sveltejs/kit";

export const actions = {
    default: async ({request, cookies}) => {
        const {data, success, error} = signinScheme.safeParse(await request.formData());
        if (!success) {
            return fail(403);
        }
        cookies.set("pincode", data?.pincode, {sameSite: "strict", httpOnly: true, path: "/"});
        return redirect(307, "/");
    }
} satisfies Actions;

const signinScheme = zfd.formData({
    pincode: zfd.text(z.string()),
});
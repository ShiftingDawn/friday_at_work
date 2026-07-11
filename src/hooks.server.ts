import {type Handle, redirect} from "@sveltejs/kit";
import {env} from "$env/dynamic/private";

export const handle: Handle = ({event, resolve}) => {
    if (event.url.pathname === "/authorize") {
        event.cookies.delete("pincode", {sameSite: "strict", httpOnly: true, path: "/"});
        return resolve(event);
    }
    if (event.cookies.get("pincode") !== env.PINCODE) {
        event.cookies.delete("pincode", {sameSite: "strict", httpOnly: true, path: "/"});
        return redirect(307, "/authorize");
    }
    event.locals.authorized = true;
    return resolve(event);
}

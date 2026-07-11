import {type Handle, redirect} from "@sveltejs/kit";
import {PINCODE} from "$env/static/private";

export const handle: Handle = ({event, resolve}) => {
    if (event.url.pathname === "/authorize") {
        return resolve(event);
    }
    event.locals.authorized = false;
    if (event.cookies.get("pincode") !== PINCODE) {
        return redirect(307, "/authorize");
    }
    event.locals.authorized = true;
    return resolve(event);
}
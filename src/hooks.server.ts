import {type Handle, redirect} from "@sveltejs/kit";
import * as auth from "$lib/server/auth";

const PUBLIC_ROUTES = ["/signin", "/signup"];

export const handle: Handle = async ({event, resolve}) => {
    const sessionId = auth.getSessionId(event);
    if (!sessionId) {
        if (PUBLIC_ROUTES.indexOf(event.url.pathname) === -1) {
            return redirect(307, "/signin");
        }
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }
    const { session, user, } = await auth.getCurrentSession(sessionId);
    if (session) {
        auth.setSessionTokenCookie(event, sessionId, session.expiresAt);
    } else {
        await auth.destroyCurrentSession(event);
    }
    event.locals.user = user;
    event.locals.session = session;
    return resolve(event);
}

import {type Handle, redirect} from "@sveltejs/kit";
import * as auth from "$lib/server/auth";
import * as workspace from "$lib/server/workspace";

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
    const {session, user,} = await auth.getCurrentSession(sessionId);
    if (session) {
        auth.setSessionTokenCookie(event, sessionId, session.expiresAt);
    } else {
        await auth.destroyCurrentSession(event);
    }
    if (!user || !session) {
        if (PUBLIC_ROUTES.indexOf(event.url.pathname) === -1) {
            return redirect(307, "/signin");
        }
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }
    event.locals.user = user;
    event.locals.session = session;

    const workspaceId = workspace.getWorkspaceId(event);
    if (!workspaceId) {
        if (event.url.pathname !== "/workspace") {
            return redirect(307, "/workspace");
        }
        event.locals.workspace = null;
    } else {
        const ws = await workspace.getWorkspace(user!.id, workspaceId);
        if (!ws && event.url.pathname !== "/workspace") {
            return redirect(307, "/workspace");
        }
        event.locals.workspace = ws;
    }
    return resolve(event);
}

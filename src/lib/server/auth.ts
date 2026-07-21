import {env} from "$env/dynamic/private";
import {redirect, type RequestEvent} from "@sveltejs/kit";
import {getRequestEvent} from "$app/server";
import {prisma, type Session, type User} from "$lib/server/db";
import {compareSync, hashSync} from "bcrypt";

export function isValidUsername(username: unknown): username is string {
  return typeof username === "string" && username.length >= 3 && username.length <= 24 && /^[a-z0-9_-]+$/.test(username);
}

export function isValidPassword(password: unknown): password is string {
  return typeof password === "string" && password.length >= 8 && password.length <= 255;
}

export function checkPassword(possiblePassword: string, encoded: string): boolean {
  return compareSync(possiblePassword, encoded);
}

export function hashPassword(password: string): string {
  return hashSync(password, 12);
}

const SESSION_COOKIE_NAME = "sid";
const SESSION_MAX_AGE = 3600 * 24 * 28 * 1000;

export function getSessionId(event: RequestEvent): string | null {
  return event.cookies.get(SESSION_COOKIE_NAME) ?? null;
}

export async function createSession(event: RequestEvent, userId: string): Promise<Session> {
  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt: new Date(Date.now() + SESSION_MAX_AGE),
    },
  });
  setSessionTokenCookie(event, session.id, session.expiresAt);
  return session;
}

export function setSessionTokenCookie(event: RequestEvent, sessionId: string, expiresAt: Date) {
  event.cookies.set(SESSION_COOKIE_NAME, sessionId, {
    secure: env.NODE_ENV !== "development",
    path: "/",
    expires: expiresAt,
    sameSite: "strict",
    httpOnly: true,
  });
}

export type ServerSession = { session: null, user: null } | { session: Session, user: User };

export async function getCurrentSession(sid: string): Promise<ServerSession> {
  const sessionAndUser = await prisma.session.findFirst({
    where: {id: sid,},
    include: {user: true,},
  });
  if (!sessionAndUser) return {session: null, user: null,};

  const isExpired = Date.now() >= sessionAndUser.expiresAt.getTime();
  if (isExpired) {
    await prisma.session.delete({where: {id: sessionAndUser.id,},});
    return {session: null, user: null,};
  }

  const shouldRenew = Date.now() >= (sessionAndUser.expiresAt.getTime() - (SESSION_MAX_AGE / 2));
  if (shouldRenew) {
    sessionAndUser.expiresAt = new Date(Date.now() + SESSION_MAX_AGE);
    await prisma.session.update({
      where: {id: sessionAndUser.id,},
      data: {expiresAt: sessionAndUser.expiresAt,},
    });
  }

  return {session: sessionAndUser, user: sessionAndUser.user,};
}

export async function destroyCurrentSession(event: RequestEvent) {
  const sid = getSessionId(event);
  if (sid) {
    await destroySession(sid);
  }
  event.cookies.delete("sid", {path: "/",});
}

async function destroySession(sessionId: string) {
  try {
    await prisma.session.delete({where: {id: sessionId,},});
  } catch {
    //NOOP
  }
}

type RequireAuthResult = { user: User, session: Session } | never;

export function requireAuth(event?: RequestEvent): RequireAuthResult {
  const e = event ?? getRequestEvent();
  if (!e.locals.user || !e.locals.session) {
    return redirect(302, "/signin");
  }
  return {user: e.locals.user, session: e.locals.session,};
}

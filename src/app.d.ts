// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: import("$lib/server/auth").ServerSession["user"],
            session: import("$lib/server/auth").ServerSession["session"],
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};

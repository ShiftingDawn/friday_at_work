import {writable} from "svelte/store";

export type FlashMessageType = "success" | "error" | "warning" | "info";

export interface FlashMessage {
  id: string;
  type: FlashMessageType;
  title?: string;
  text: string;
}

export const flashStore = writable<FlashMessage[]>([]);

export function flash(type: FlashMessageType, titleOrText: string, text?: string) {
  const msg: FlashMessage = {
    id: crypto.randomUUID(),
    type,
    title: text ? titleOrText : undefined,
    text: text ? text : titleOrText,
  };
  flashStore.update(msgs => ([msg, ...msgs,]));
  setTimeout(() => flashStore.update(msgs => msgs.filter(msg2 => msg2.id !== msg.id)), 5000);
}

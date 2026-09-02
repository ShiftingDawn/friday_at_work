import {persisted} from "svelte-persisted-store";

export const theme = persisted<"light" | "dark" | "auto">("theme", "auto");
export const showTime = persisted("showtime", false);
export const useOldBarStyle = persisted("useOldBarStyle", false);

theme.subscribe(selectedTheme => {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", selectedTheme);
  }
});

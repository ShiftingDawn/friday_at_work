import {persisted} from "svelte-persisted-store";

export const theme = persisted<"light" | "dark" | "auto">("theme", "auto");
export const showTime = persisted("showtime", false);
export const useOldBarStyle = persisted("useOldBarStyle", false);

theme.subscribe(selectedTheme => {
  if (typeof document !== "undefined") {
    const useDarkMode = selectedTheme === "dark"
      || (selectedTheme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.setAttribute("data-theme", useDarkMode ? "dark" : "light");
  }
});

import {get} from "svelte/store";
import {theme} from "$lib/preferences";

export function listenToThemeChanges(callback: (theme: "light" | "dark" | "auto") => void): () => void {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.target === document.documentElement && mutation.type === "attributes" && mutation.attributeName === "data-theme") {
        const newTheme = document.documentElement.getAttribute("data-theme");
        callback(newTheme as "light" | "dark" | "auto");
      }
    });
  });
  observer.observe(document.documentElement, {attributes: true,});
  return () => observer.disconnect();
}

export function isDarkMode() {
  return get(theme) == "dark" || (get(theme) == "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

import { useEffect } from "react";
import { useSettings } from "@/lib/store";

export function useTheme() {
  const theme = useSettings((s) => s.theme);

  useEffect(() => {
    const apply = (isDark: boolean) => {
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      apply(mq.matches);
      const handler = (e: MediaQueryListEvent) => apply(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      apply(theme === "dark");
    }
  }, [theme]);

  return theme;
}

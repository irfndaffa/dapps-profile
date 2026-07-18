"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/lib/use-theme";

export default function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors duration-200 hover:bg-paper-alt hover:text-ink active:scale-95"
    >
      {isDark ? (
        <FiSun aria-hidden="true" className="h-4 w-4" />
      ) : (
        <FiMoon aria-hidden="true" className="h-4 w-4" />
      )}
    </button>
  );
}

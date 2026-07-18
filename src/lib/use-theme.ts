"use client";

import { useSyncExternalStore } from "react";
import { getTheme, subscribeTheme, toggleTheme, type Theme } from "./theme-store";

function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme(): [Theme, () => void] {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerSnapshot);
  return [theme, toggleTheme];
}

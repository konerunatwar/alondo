import * as echarts from "echarts/core";
import {
  buildErgolytChartTheme,
  buildStaticErgolytChartThemes,
  getChartThemeName,
  type ChartThemeMode,
} from "@/lib/charts/theme";
import { getChartTokens } from "@/lib/charts/tokens";

let themesRegistered = false;

export function registerErgolytChartThemes() {
  if (themesRegistered || typeof window === "undefined") {
    return;
  }

  const staticThemes = buildStaticErgolytChartThemes();

  echarts.registerTheme(getChartThemeName("light"), staticThemes.light);
  echarts.registerTheme(getChartThemeName("dark"), staticThemes.dark);

  themesRegistered = true;
}

export function syncErgolytChartThemesFromCss() {
  if (typeof window === "undefined") {
    return;
  }

  registerErgolytChartThemes();

  const tokens = getChartTokens();
  const theme = buildErgolytChartTheme(tokens);
  const mode = getResolvedChartThemeMode();

  echarts.registerTheme(getChartThemeName(mode), theme);
}

export function getResolvedChartThemeMode(): ChartThemeMode {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

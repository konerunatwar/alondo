import type { ChartTokens } from "@/lib/charts/tokens";
import { getChartSeriesColors } from "@/lib/charts/tokens";

export type ChartThemeMode = "light" | "dark";

const STATIC_CHART_TOKENS: Record<ChartThemeMode, ChartTokens> = {
  light: {
    "--chart-1": "#3b82f6",
    "--chart-2": "#93c5fd",
    "--chart-3": "#2563eb",
    "--chart-4": "#bfdbfe",
    "--chart-5": "#1d4ed8",
    "--foreground": "#171717",
    "--muted-foreground": "#737373",
    "--border": "#e5e5e5",
    "--card": "#ffffff",
    "--popover": "#ffffff",
    "--popover-foreground": "#171717",
    "--background": "#ffffff",
  },
  dark: {
    "--chart-1": "#60a5fa",
    "--chart-2": "#93c5fd",
    "--chart-3": "#3b82f6",
    "--chart-4": "#bfdbfe",
    "--chart-5": "#2563eb",
    "--foreground": "#fafafa",
    "--muted-foreground": "#a3a3a3",
    "--border": "rgba(255, 255, 255, 0.1)",
    "--card": "#262626",
    "--popover": "#262626",
    "--popover-foreground": "#fafafa",
    "--background": "#171717",
  },
};

export function getChartThemeName(mode: ChartThemeMode) {
  return `ergolyt-${mode}`;
}

export function buildErgolytChartTheme(tokens: ChartTokens) {
  const colors = getChartSeriesColors(tokens);
  const axisColor = tokens["--border"];
  const labelColor = tokens["--muted-foreground"];
  const textColor = tokens["--foreground"];

  return {
    color: colors,
    backgroundColor: "transparent",
    textStyle: {
      color: textColor,
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    title: {
      textStyle: {
        color: textColor,
        fontWeight: 600,
      },
      subtextStyle: {
        color: labelColor,
      },
    },
    legend: {
      textStyle: {
        color: labelColor,
      },
      pageTextStyle: {
        color: labelColor,
      },
    },
    tooltip: {
      backgroundColor: tokens["--popover"],
      borderColor: axisColor,
      textStyle: {
        color: tokens["--popover-foreground"],
      },
      extraCssText: "border-radius: 10px; box-shadow: none;",
    },
    axisPointer: {
      lineStyle: {
        color: axisColor,
      },
      crossStyle: {
        color: axisColor,
      },
    },
    categoryAxis: {
      axisLine: {
        lineStyle: {
          color: axisColor,
        },
      },
      axisTick: {
        lineStyle: {
          color: axisColor,
        },
      },
      axisLabel: {
        color: labelColor,
      },
      splitLine: {
        lineStyle: {
          color: axisColor,
          opacity: 0.35,
        },
      },
    },
    valueAxis: {
      axisLine: {
        lineStyle: {
          color: axisColor,
        },
      },
      axisTick: {
        lineStyle: {
          color: axisColor,
        },
      },
      axisLabel: {
        color: labelColor,
      },
      splitLine: {
        lineStyle: {
          color: axisColor,
          opacity: 0.35,
        },
      },
    },
    line: {
      smooth: true,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        width: 2,
      },
    },
    bar: {
      barMaxWidth: 36,
      itemStyle: {
        borderRadius: [6, 6, 6, 6],
      },
      emphasis: {
        disabled: true,
      },
    },
  };
}

export function buildStaticErgolytChartThemes() {
  return {
    light: buildErgolytChartTheme(STATIC_CHART_TOKENS.light),
    dark: buildErgolytChartTheme(STATIC_CHART_TOKENS.dark),
  };
}

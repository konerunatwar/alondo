const CHART_TOKEN_NAMES = [
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
  "--foreground",
  "--muted-foreground",
  "--border",
  "--card",
  "--popover",
  "--popover-foreground",
  "--background",
] as const;

export type ChartTokenName = (typeof CHART_TOKEN_NAMES)[number];

export type ChartTokens = Record<ChartTokenName, string>;

let colorResolver: HTMLSpanElement | null = null;

/** ECharts canvas cannot reliably parse oklch/hsl on hover — resolve to rgb(). */
export function resolveCssColor(color: string) {
  if (!color || typeof document === "undefined") {
    return color;
  }

  if (!colorResolver) {
    colorResolver = document.createElement("span");
    colorResolver.style.display = "none";
    document.documentElement.appendChild(colorResolver);
  }

  colorResolver.style.color = "";
  colorResolver.style.color = color;

  const resolved = getComputedStyle(colorResolver).color;
  return resolved || color;
}

function readCssVariable(name: ChartTokenName) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  return resolveCssColor(raw);
}

export function getChartTokens(): ChartTokens {
  return CHART_TOKEN_NAMES.reduce((tokens, name) => {
    tokens[name] = readCssVariable(name);
    return tokens;
  }, {} as ChartTokens);
}

export function getChartSeriesColors(tokens: ChartTokens) {
  return [
    tokens["--chart-1"],
    tokens["--chart-2"],
    tokens["--chart-3"],
    tokens["--chart-4"],
    tokens["--chart-5"],
  ];
}

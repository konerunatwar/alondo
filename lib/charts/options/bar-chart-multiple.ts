import type { EChartsOption } from "echarts";
import {
  barChartMonths,
  barRadius,
  createBarChartBase,
} from "@/lib/charts/options/bar-chart-base";

const desktopVisitors = [186, 305, 237, 73, 209, 214];
const mobileVisitors = [80, 200, 120, 190, 130, 140];

export function buildBarChartMultipleOption(): EChartsOption {
  return {
    ...createBarChartBase(barChartMonths),
    series: [
      {
        name: "Desktop",
        type: "bar",
        barMaxWidth: 28,
        data: desktopVisitors,
        itemStyle: {
          borderRadius: [...barRadius],
        },
        emphasis: {
          disabled: true,
        },
      },
      {
        name: "Mobile",
        type: "bar",
        barMaxWidth: 28,
        data: mobileVisitors,
        itemStyle: {
          borderRadius: [...barRadius],
        },
        emphasis: {
          disabled: true,
        },
      },
    ],
  };
}

export const barChartMultipleOption = buildBarChartMultipleOption();

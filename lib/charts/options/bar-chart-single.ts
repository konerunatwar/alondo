import type { EChartsOption } from "echarts";
import {
  barChartMonths,
  barRadius,
  createBarChartBase,
} from "@/lib/charts/options/bar-chart-base";

const visitors = [186, 305, 237, 73, 209, 214];

export function buildBarChartSingleOption(): EChartsOption {
  return {
    ...createBarChartBase(barChartMonths),
    series: [
      {
        name: "Visitors",
        type: "bar",
        barMaxWidth: 40,
        data: visitors,
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

export const barChartSingleOption = buildBarChartSingleOption();

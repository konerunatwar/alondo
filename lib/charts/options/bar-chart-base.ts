import type { EChartsOption } from "echarts";

export const barChartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] as const;

export const barRadius = [4, 4, 4, 4] as const;

export function createBarChartBase(
  categories: readonly string[],
): Pick<EChartsOption, "grid" | "tooltip" | "xAxis" | "yAxis"> {
  return {
    grid: {
      left: 4,
      right: 4,
      top: 8,
      bottom: 4,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        show: false,
      },
    },
    xAxis: {
      type: "category",
      data: [...categories],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          opacity: 0.35,
        },
      },
    },
  };
}

"use client";

import { TrendingUp } from "lucide-react";
import { ChartCard } from "@/components/charts/chart-card";
import { barChartMultipleOption } from "@/lib/charts/options/bar-chart-multiple";
import { barChartSingleOption } from "@/lib/charts/options/bar-chart-single";

export function DashboardCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartCard
        title="Bar Chart"
        description="January - June 2024"
        option={barChartSingleOption}
        chartClassName="min-h-[250px]"
        footer={
          <>
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month
              <TrendingUp className="size-4" aria-hidden />
            </div>
            <p className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </p>
          </>
        }
      />
      <ChartCard
        title="Bar Chart - Multiple"
        description="January - June 2024"
        option={barChartMultipleOption}
        chartClassName="min-h-[250px]"
        footer={
          <>
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month
              <TrendingUp className="size-4" aria-hidden />
            </div>
            <p className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </p>
          </>
        }
      />
    </div>
  );
}

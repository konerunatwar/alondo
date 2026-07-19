"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import type { EChartsOption } from "echarts";
import { cn } from "@/lib/utils";
import {
  getResolvedChartThemeMode,
  registerErgolytChartThemes,
  syncErgolytChartThemesFromCss,
} from "@/lib/charts/register-themes";

type EChartsViewProps = {
  option: EChartsOption;
  className?: string;
};

export function EChartsView({ option, className }: EChartsViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof import("echarts").init> | null>(
    null,
  );
  const optionRef = useRef(option);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    optionRef.current = option;
  }, [option]);

  useEffect(() => {
    let disposed = false;
    let resizeObserver: ResizeObserver | null = null;

    async function mountChart() {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      registerErgolytChartThemes();
      syncErgolytChartThemesFromCss();

      const echarts = await import("echarts");
      if (disposed) {
        return;
      }

      const themeName = `ergolyt-${getResolvedChartThemeMode()}`;

      if (!chartRef.current) {
        chartRef.current = echarts.init(container, themeName, {
          renderer: "canvas",
        });
      } else {
        chartRef.current.dispose();
        chartRef.current = echarts.init(container, themeName, {
          renderer: "canvas",
        });
      }

      chartRef.current.setOption(optionRef.current, { notMerge: true });

      resizeObserver = new ResizeObserver(() => {
        chartRef.current?.resize();
      });
      resizeObserver.observe(container);
    }

    mountChart();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, [resolvedTheme]);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    chartRef.current.setOption(option, { notMerge: true });
  }, [option]);

  return (
    <div
      ref={containerRef}
      className={cn("min-h-[280px] w-full", className)}
      role="img"
      aria-hidden
    />
  );
}

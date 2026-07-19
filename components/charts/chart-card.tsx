import type { ReactNode } from "react";
import type { EChartsOption } from "echarts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EChartsView } from "@/components/charts/echarts-view";
import { cn } from "@/lib/utils";

type ChartCardProps = {
  title: string;
  description?: string;
  option: EChartsOption;
  footer?: ReactNode;
  className?: string;
  chartClassName?: string;
};

export function ChartCard({
  title,
  description,
  option,
  footer,
  className,
  chartClassName,
}: ChartCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <EChartsView option={option} className={chartClassName} />
      </CardContent>
      {footer ? (
        <div className="flex flex-col gap-2 px-(--card-spacing) pb-(--card-spacing) text-sm">
          {footer}
        </div>
      ) : null}
    </Card>
  );
}

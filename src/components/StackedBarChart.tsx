"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartDataItem = Record<string, string | number>;

type Category = {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  userId: string;
};

type Props = {
  chartConfig: ChartConfig;
  chartData: ChartDataItem[];
  categories: Category[];
};

export function StackedBarChart({ chartConfig, chartData, categories }: Props) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        {categories.map((category, index) => (
          <Bar
            key={category.id}
            dataKey={category.id}
            stackId={"a"}
            fill={category.color}
            barSize={20}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

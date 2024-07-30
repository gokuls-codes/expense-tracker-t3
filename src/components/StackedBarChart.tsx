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
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;

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

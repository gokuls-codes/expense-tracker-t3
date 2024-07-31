import { ReportsForm } from "@/components/ReportsForm";
import { StackedBarChart } from "@/components/StackedBarChart";
import { api } from "@/trpc/server";
import React from "react";

const ReportsPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  let chartData, chartConfig;

  const inp = {
    start: new Date(Number(searchParams.start)),
    end: new Date(Number(searchParams.end)),
    frequency: searchParams.frequency!,
  };

  const categories = await api.category.get();

  if (searchParams.start && searchParams.end && searchParams.frequency) {
    const res = await api.expense.getReport(inp);

    chartData = res.chartData;
    chartConfig = res.chartConfig;
  }

  return (
    <main className="container ">
      <div className=" w-full border-l border-r border-border">
        <div className=" flex min-h-[80vh] flex-col gap-4 divide-y divide-solid divide-border p-4 lg:flex-row lg:divide-x lg:divide-y-0">
          <ReportsForm inp={inp} />
          <div className="  no-scrollbar h-[60vh] flex-1 space-y-4 overflow-x-auto px-4">
            {chartConfig && chartData && (
              <StackedBarChart
                chartConfig={chartConfig}
                chartData={chartData}
                categories={categories}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportsPage;

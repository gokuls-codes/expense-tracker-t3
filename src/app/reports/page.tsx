import { ReportsForm } from "@/components/ReportsForm";
import { StackedBarChart } from "@/components/StackedBarChart";
import { api } from "@/trpc/server";
import React from "react";

const ReportsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  let chartData, chartConfig;

  const categories = await api.category.get();

  if (searchParams.start && searchParams.end && searchParams.frequency) {
    const res = await api.expense.getReport({
      start: new Date(Number(searchParams.start)),
      end: new Date(Number(searchParams.end)),
      frequency: searchParams.frequency,
    });

    chartData = res.chartData;
    chartConfig = res.chartConfig;
  }

  return (
    <main className="container ">
      <div className=" w-full border-l border-r border-border">
        <div className=" flex min-h-[80vh] flex-col gap-4 divide-y divide-solid divide-border p-4 lg:flex-row lg:divide-x lg:divide-y-0">
          <ReportsForm />
          <div className=" flex-1 space-y-4 px-4">
            <h2 className=" text-2xl">Report Chart</h2>
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

import { ReportsForm } from "@/components/ReportsForm";
import { StackedBarChart } from "@/components/StackedBarChart";
import WeeklyExpenses from "@/components/WeeklyExpenses";
import { api } from "@/trpc/server";
import React from "react";

const ReportsPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) => {
  let chartData, chartConfig, expenses;

  const inp = {
    start: new Date(Number(searchParams.start)),
    end: new Date(Number(searchParams.end)),
    frequency: searchParams.frequency!,
    categories: new Set(
      searchParams.categories?.split(",").filter((item) => item != "") || [],
    ),
  };

  const categories = await api.category.get();

  if (searchParams.start && searchParams.end && searchParams.frequency) {
    const res = await api.expense.getReport(inp);

    chartData = res.chartData;
    chartConfig = res.chartConfig;
    expenses = res.expenses;
  }

  const total = expenses?.reduce((acc, curr) => acc + curr.amount, 0);

  console.log(total);

  return (
    <main className="container ">
      <div className=" w-full border-l border-r border-border">
        <div className=" flex min-h-[80vh]  flex-col gap-4 divide-y divide-solid divide-border border-b p-4 lg:flex-row lg:divide-x lg:divide-y-0">
          <ReportsForm inp={inp} categories={categories} />
          <div className="  no-scrollbar h-[80vh] flex-1 space-y-4 overflow-x-auto px-4">
            {chartConfig && chartData && (
              <StackedBarChart
                chartConfig={chartConfig}
                chartData={chartData}
                categories={categories}
              />
            )}
          </div>
        </div>
        {expenses && (
          <div className=" flex h-[60vh] flex-col lg:flex-row">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-b border-border lg:w-1/3 lg:border-b-0">
              <h3 className=" text-4xl">Total:</h3>
              <p className=" text-6xl">
                {"\u20B9"}
                {total?.toFixed(2) ?? 0}
              </p>
            </div>
            <div className=" max-h-[80vh] overflow-y-auto lg:w-2/3">
              <WeeklyExpenses expenses={expenses} />
            </div>
          </div>
        )}
      </div>
      <div className=" mt-4 border-y border-border py-4">
        <p className=" text-center">Made by Gokul</p>
      </div>
    </main>
  );
};

export default ReportsPage;

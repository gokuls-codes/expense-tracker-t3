import React from "react";
import DoughnutChart from "./Doughnut";
import WeeklyExpenses from "./WeeklyExpenses";
import { api } from "@/trpc/server";

type Category = {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  userId: string;
};

type Props = {
  categories: Category[];
};

const YearSummarySection = async ({ categories }: Props) => {
  const expenses = await api.expense.getYearExpenses();

  const categoryData = await api.expense.getCategoryTotalYear();

  const {
    _sum: { amount: yearTotal },
  } = await api.expense.getYearTotal();

  const chartData = categories.map((category) => ({
    ...category,
    fill: category.color,
    total:
      categoryData.find((data) => data.categoryId === category.id)?._sum
        .amount || 0,
  }));

  return (
    <section className=" my-4 ">
      <div className="  flex flex-col justify-between rounded-md border-y border-border bg-muted/40 px-8 py-4 text-4xl font-light lg:flex-row lg:items-center ">
        <h2 className=" text-foreground/50">This year</h2>
        <h3 className=" text-2xl text-foreground">
          {"\u20B9"}
          {yearTotal?.toFixed(2) ?? 0}
        </h3>
      </div>
      <div className=" flex h-[80vh] flex-col items-center gap-4 border-b border-border pb-2 lg:h-[40vh] lg:flex-row">
        <DoughnutChart chartData={chartData} />
        <div className="  no-scrollbar h-full w-full overflow-y-scroll border-t border-border lg:w-3/5 lg:border-l">
          <WeeklyExpenses expenses={expenses} />
        </div>
      </div>
    </section>
  );
};

export default YearSummarySection;

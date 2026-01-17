import { SidebarTrigger } from "@/components/ui/sidebar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";
import { api } from "@/trpc/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MonthCard from "@/components/dashboard/month-card";

const DashboardPage = async () => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return redirect("/login");
  }

  const expenses = await api.expense.getMonthExpenses();
  const categories = await api.category.get();

  const categoryData = await api.expense.getCategoryTotalMonth();

  const topCategories = categoryData
    .sort((a, b) => (b._sum.amount ?? 0) - (a._sum.amount ?? 0))
    .slice(0, 3)
    .map((category) => categories.find((cat) => cat.id === category.categoryId))
    .filter((category) => !!category);

  const {
    _sum: { amount: monthTotal },
  } = await api.expense.getMonthTotal();

  return (
    <div className=" space-y-8">
      <SidebarTrigger />

      <div className=" flex items-center justify-between">
        <div className=" ">
          <h2 className=" text-4xl font-semibold">Welcome back,</h2>
          <p className=" text-3xl font-light"> {session.user.name}</p>
        </div>

        <p>Month</p>
      </div>

      <div className="flex gap-4">
        <Card className=" flex-1">
          <CardHeader>
            <CardTitle className=" text-lg font-light text-muted-foreground">
              Monthly expenses
            </CardTitle>
            <CardDescription className=" text-3xl font-semibold text-foreground">
              $3,240.00
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <p>Mostly rent & food</p>
          </CardFooter>
        </Card>

        <Card className=" flex-1">
          <CardHeader>
            <CardTitle className=" text-lg font-light text-muted-foreground">
              Monthly expenses
            </CardTitle>
            <CardDescription className=" text-3xl font-semibold text-foreground">
              $3,240.00
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <p>Mostly rent & food</p>
          </CardFooter>
        </Card>
        <MonthCard monthTotal={monthTotal} topCategories={topCategories} />
      </div>
    </div>
  );
};

export default DashboardPage;

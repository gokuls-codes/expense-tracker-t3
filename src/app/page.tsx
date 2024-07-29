import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import AddExpenseForm from "@/components/AddExpenseForm";
import SummarySection from "@/components/SummarySection";
import AddCategoryForm from "@/components/AddCategoryForm";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonthSummarySection from "@/components/MonthSummarySection";
import YearSummarySection from "@/components/YearSummarySection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const categories = await api.category.get();

  return (
    <main className="container ">
      <div className=" mx-auto my-4 max-w-screen-lg border-l border-r border-border">
        <div className=" flex flex-col gap-4 px-4 lg:flex-row">
          <section className="  flex-1 rounded-lg border  border-border px-4 py-4">
            <h2 className="  text-2xl font-light text-foreground/50">
              Add Expense
            </h2>
            <AddExpenseForm categories={categories} />
          </section>

          <section className="  flex-1 rounded-lg border  border-border px-4 py-4">
            <h2 className="  text-2xl font-light text-foreground/50">
              Create Category
            </h2>
            <AddCategoryForm categories={categories} />
          </section>
        </div>

        <Tabs defaultValue="month" className=" mt-8">
          <TabsList className=" mx-auto grid w-1/2 grid-cols-3 ">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          <TabsContent value="week">
            <SummarySection categories={categories} />
          </TabsContent>
          <TabsContent value="month">
            <MonthSummarySection categories={categories} />
          </TabsContent>
          <TabsContent value="year">
            <YearSummarySection categories={categories} />
          </TabsContent>
        </Tabs>

        <Link href={"/reports"} className="  ">
          <Button variant="link" className=" flex gap-2 text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chart-no-axes-column"
            >
              <line x1="18" x2="18" y1="20" y2="10" />
              <line x1="12" x2="12" y1="20" y2="4" />
              <line x1="6" x2="6" y1="20" y2="14" />
            </svg>
            View complete reports
          </Button>
        </Link>

        <div className=" mt-4 border-y border-border py-4">
          <p className=" text-center">Made by Gokul</p>
        </div>
      </div>
    </main>
  );
}

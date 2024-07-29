import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import AddExpenseForm from "@/components/AddExpenseForm";
import SummarySection from "@/components/SummarySection";
import AddCategoryForm from "@/components/AddCategoryForm";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonthSummarySection from "@/components/MonthSummarySection";
import YearSummarySection from "@/components/YearSummarySection";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const categories = await api.category.get();

  return (
    <main className="container ">
      <div className=" mx-auto my-4 max-w-screen-lg border-l border-r border-border">
        {/* <div className="flex items-center space-x-2">
          <Input type="color" className=" w-16 p-0" id="color-picker" />
          <Label htmlFor="color-picker">Pick a color</Label>
        </div> */}

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

        <div className=" py-4">
          <p className=" text-center">Made by Gokul</p>
        </div>
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }

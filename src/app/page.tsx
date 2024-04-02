import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import DoughnutChart from "@/components/Doughnut";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddExpenseForm from "@/components/AddExpenseForm";
import { ComboboxForm } from "@/components/TestForm";
import SummarySection from "@/components/SummarySection";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="container ">
      <div className=" mx-auto max-w-screen-lg border-l border-r border-border">
        <ThemeSwitch />

        {/* <div className="flex items-center space-x-2">
          <Input type="color" className=" w-16 p-0" id="color-picker" />
          <Label htmlFor="color-picker">Pick a color</Label>
        </div> */}

        <section className=" my-4 rounded-lg border-y border-border  px-4 py-4">
          <h2 className=" pl-8 text-4xl font-light text-foreground/50">
            Add Expense
          </h2>
          <AddExpenseForm />
        </section>

        <SummarySection />
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

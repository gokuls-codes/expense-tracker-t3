import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import AddExpenseForm from "@/components/AddExpenseForm";
import SummarySection from "@/components/SummarySection";
import AddCategoryForm from "@/components/AddCategoryForm";
import { redirect } from "next/navigation";

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

        <SummarySection categories={categories} />

        {/* <div className=" grid grid-cols-2 gap-2">
          {keys.map((key) => (
            <div
              className=" h-20 rounded-sm"
              key={key}
              style={{
                backgroundColor: colors[key],
                color: colors[key + "Foreground"],
              }}
            >
              {key}
            </div>
          ))}
        </div> */}
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

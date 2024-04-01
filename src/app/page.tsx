import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import DoughnutChart from "@/components/Doughnut";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import TopBar from "@/components/TopBar";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="container ">
      <div className=" mx-auto max-w-screen-lg border-l border-r border-border">
        <ThemeSwitch />
        <DoughnutChart />
        <DoughnutChart />
        <DoughnutChart />
        <DoughnutChart />
        <DoughnutChart />
        <DoughnutChart />
        <DoughnutChart />
        <DoughnutChart />
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

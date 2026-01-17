import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return redirect("/login");
  }

  return <div></div>;
};

export default DashboardPage;

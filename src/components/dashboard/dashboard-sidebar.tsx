import {
  Banknote,
  Calendar,
  Columns3,
  CreditCard,
  Home,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

import Icon from "../../../public/icon.png";
import Link from "next/link";
import LogOutButton from "../LogOutButton";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard size={32} />,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: <Columns3 size={32} />,
  },
  {
    title: "Payment methods",
    url: "/dashboard/payment-methods",
    icon: <CreditCard size={32} />,
  },
  {
    title: "Expenses",
    url: "/dashboard/expenses",
    icon: <Banknote size={32} />,
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className=" border-b">
        <Link
          className=" flex items-center justify-center gap-4 p-2"
          href={"/"}
        >
          <Image src={Icon} alt="icon" height={40} width={40} />

          <div className=" relative text-2xl ">
            <h2 className=" ">Expense</h2>
            <h2 className=" ">Tracker</h2>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={"lg"}
                    className=" [&>svg]:size-8"
                  >
                    <a href={item.url}>
                      {item.icon}
                      <span className=" ">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LogOutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

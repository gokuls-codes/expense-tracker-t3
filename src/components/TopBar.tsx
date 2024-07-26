import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import LogOutButton from "./LogOutButton";

const TopBar = () => {
  return (
    <header className="  sticky top-0 z-50 w-full  border-b border-border/50 bg-background/20 py-4 backdrop-blur">
      <div className=" container flex items-center justify-between">
        <Link className=" flex items-center gap-4" href={"/"}>
          <Image src={"/payment.png"} alt="icon" height={40} width={40} />
          <div className=" relative text-2xl ">
            <h2 className=" relative -left-1 top-1">Expense</h2>
            <h2 className=" relative -top-1 ">Tracker</h2>
          </div>
        </Link>
        <ul className=" flex items-center justify-center gap-4 text-xl">
          {/* <li>
            <Link
              href={"/categories"}
              className=" inline-block rounded-sm border-2 border-transparent p-2 transition-all duration-200 hover:border-border"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href={"/reports"}
              className="inline-block rounded-sm border-2 border-transparent p-2 transition-all duration-200 hover:border-border"
            >
              Reports
            </Link>
          </li> */}
          <li>
            <ThemeSwitch />
          </li>
          <li>
            <LogOutButton />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default TopBar;

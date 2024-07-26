"use client";

import React from "react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

const LogOutButton = () => {
  const { data: session } = useSession();

  if (session)
    return (
      <div className=" flex flex-row items-center gap-4">
        {session.user.name}
        <Button variant="outline" size="icon" onClick={() => signOut()}>
          <LogOut />
        </Button>
      </div>
    );

  return (
    <Button variant="outline" size="icon" onClick={() => signIn()}>
      <LogIn />
    </Button>
  );
};

export default LogOutButton;

"use client";

import React from "react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const LogOutButton = () => {
  const { data: session } = useSession();

  if (session)
    return (
      <div className=" flex flex-row items-center justify-between gap-4 p-2">
        <div className=" flex flex-row items-center gap-4">
          {session.user.email === "gokulkannanr9@gmail.com" && (
            <Image
              src={
                "https://cdn.discordapp.com/avatars/719886641401036861/ed11fe156f4ba49c369e3fcca2388e5d.webp"
              }
              alt="user"
              height={40}
              width={40}
              className=" rounded-full"
            />
          )}
          <p className=" text-lg">{session.user.name}</p>
        </div>

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

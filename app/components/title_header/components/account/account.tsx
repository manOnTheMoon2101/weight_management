"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { signOut } from "next-auth/react";
import { ModeToggle } from "../theme/toggle";
import Nutrients from "../nutrients/Nutrients";
const Account = () => {
  const { data: session } = useSession();
  const name = session?.user?.name || null;
  const cleanedName = name ? name.replace(/^"(.*)"$/, "$1") : null;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div className="flex flex-row items-baseline cursor-pointer">
              <div className="mx-2">
                <Avatar>
                  <AvatarFallback>
                    {name ? cleanedName?.charAt(0) : null}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-white">{name}</div>
            </div>
      
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <div>
            <ModeToggle />
            <Nutrients/>
            <DropdownMenuItem
              className="bg-red-900 text-slate-50 flex flex-row justify-center  mt-5 cursor-pointer"
              onClick={() => signOut()}
            >
              Sign Out
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Account;

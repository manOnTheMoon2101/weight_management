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

import { signIn, signOut } from "next-auth/react";
import { ModeToggle } from "../theme/toggle";
const Account = () => {
  const { data: session } = useSession();
  const name = session?.user?.name || null;
  const cleanedName = name ? name.replace(/^"(.*)"$/, "$1") : null;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <div className="flex flex-row items-baseline">
              <div>
                <Avatar>
                  <AvatarFallback>
                    {name ? cleanedName?.charAt(0) : null}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>{name}</div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <div>
            <ModeToggle />
            <DropdownMenuItem
              className="bg-red-900 text-slate-50 flex flex-row justify-center  mt-5"
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

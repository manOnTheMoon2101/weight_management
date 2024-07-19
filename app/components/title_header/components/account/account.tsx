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
import { Avatar, AvatarFallback} from "@/components/ui/avatar";

import { signIn, signOut } from "next-auth/react";
const Account = () => {
  const { data: session } = useSession();
  const name = JSON.stringify(session?.user?.name);
  const cleanedName = name.replace(/^"(.*)"$/, "$1");
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <div className="flex flex-row items-baseline">
              <div>
                <Avatar>
                  <AvatarFallback>
                    {name ? cleanedName.charAt(0) : null}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>{JSON.stringify(session?.user?.name)}</div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => signOut()}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Account;

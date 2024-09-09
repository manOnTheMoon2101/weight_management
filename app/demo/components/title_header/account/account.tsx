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
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ModeToggle } from "@/app/components/title_header/components/theme/toggle";
const Account = () => {
  const router = useRouter();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row items-baseline cursor-pointer">
            <div className="mx-2">
              <Avatar>
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-white">Demo</div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <div>
            <ModeToggle />
            <DropdownMenuItem
              className="bg-red-900 text-slate-50 flex flex-row justify-center  mt-5 cursor-pointer"
              onClick={() => router.push("/login")}
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

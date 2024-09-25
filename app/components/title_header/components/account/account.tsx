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
import { PiSignOut } from "react-icons/pi";
import { MenubarDemo } from "../menu/MenuBar";
const Account = () => {
  const { data: session } = useSession();
  const name = session?.user?.name || null;
  const cleanedName = name ? name.replace(/^"(.*)"$/, "$1") : null;
  return (
    <div>
      <MenubarDemo/>
    </div>
  );
};

export default Account;

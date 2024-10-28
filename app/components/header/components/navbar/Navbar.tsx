"use client";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { PiSignOut } from "react-icons/pi";
import { ModeToggle } from "./theme/toggle";
export function NavBar() {
  const { data: session } = useSession();
  const name = session?.user?.name || null;
  const cleanedName = name ? name.replace(/^"(.*)"$/, "$1") : null;
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Theme</MenubarTrigger>
        <MenubarContent className="bg-background2">
          <ModeToggle />
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Account</MenubarTrigger>
        <MenubarContent className="bg-background2">
          <div>
            <div className="flex flex-row justify-around items-center">
              <Avatar>
                <AvatarFallback>
                  {name ? cleanedName?.charAt(0) : null}
                </AvatarFallback>
              </Avatar>
              <p>{name}</p>
            </div>
            <div className="flex flex-row justify-end">
              <Button
                className="bg-red-900 text-slate-50 cursor-pointer"
                onClick={() => signOut()}
              >
                Log Out
                <PiSignOut />
              </Button>
            </div>
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

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
import { MdAccountCircle } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { useEffect } from "react";
import { useState } from "react";
import { IoMdMoon } from "react-icons/io";
export function NavBar() {
  const { data: session } = useSession();
  const name = session?.user?.name || null;
  const cleanedName = name ? name.replace(/^"(.*)"$/, "$1") : null;
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, []);
  return (
    <Menubar>
      <MenubarMenu>
        <ModeToggle />
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <MdAccountCircle />
        </MenubarTrigger>
        <MenubarContent className="bg-background">
          <div>
            <div className="flex flex-row justify-around items-center">
              <Avatar className="bg-secondary">
                <AvatarFallback>
                  <span className="text-primary">
                    {name ? cleanedName?.charAt(0) : null}
                  </span>
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

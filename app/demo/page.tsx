"use client";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PiSignOut } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";

function Demo() {
  return (
    <div>
      <div className="flex flex-row justify-end items-baseline bg-accent">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <MdAccountCircle />
            </MenubarTrigger>
            <MenubarContent className="bg-background">
              <div>
                <div className="flex flex-row justify-around items-center">
                  <Avatar className="bg-accent">
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                  <span>Demo</span>
                </div>
                <div className="flex flex-row justify-end">
                  <Button className="bg-red-900 text-slate-50 cursor-pointer">
                    <Link href="/">
                      Log Out
                    </Link>
                    <PiSignOut />
                  </Button>
                </div>
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}

export default Demo;

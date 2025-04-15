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
import WeightGraph from "@/app/components/body/body/graphs/WeightGraph";
import { CalorieGraph } from "@/app/components/body/body/graphs/CalorieGraph";
import { Dashboard_table } from "../components/body/body/table/Table";
import json from "@/utils/demo_data.json";
import Link from "next/link";
import { ModeToggle } from "../components/header/components/navbar/theme/toggle";

function Demo() {
  const data = json;
  return (
    <div>
      <div className="flex flex-row justify-end items-baseline bg-accent">
        <Menubar>
          <MenubarMenu>
            <ModeToggle />
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>
              <div className="flex flex-row justify-around items-center">
                <Avatar className="bg-secondary w-8 h-8">
                  <AvatarFallback>
                    <span className="text-primary">J</span>
                  </AvatarFallback>
                </Avatar>
                <span className="mx-2">John</span>
              </div>
            </MenubarTrigger>
            <MenubarContent className="bg-background">
              <div>
                <div className="flex flex-row justify-end">
                  <Button className="bg-red-900 text-slate-50 cursor-pointer">
                    <Link href="/">Log Out</Link>
                    <PiSignOut />
                  </Button>
                </div>
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div className="flex flex-col md:flex-col justify-around  h-full">
        <div className="w-full my-5 md:flex flex-row justify-around overflow-auto">
          <WeightGraph data={data} month={"05"} />
          <CalorieGraph data={data} month={"05"} />
        </div>
        <div className="w-full my-5 flex-1">
          <Dashboard_table data={data} month={"05"} demo={"demo"} />
        </div>
      </div>
    </div>
  );
}

export default Demo;

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
import {CalorieGraph} from "@/app/components/body/body/graphs/CalorieGraph";
import { Dashboard_table } from "../components/body/body/table/Table";
import Link from "next/link";

function Demo() {
  const data = [
    {
      id: 1,
      weight: 100,
      createdAt: "Monday, April 14, 2025",
      updatedAt: "2025-04-14T06:46:07.847Z",
      isActive: true,
      isDeleted: false,
      tookFatburner: false,
      tookWeightmanagement: false,
      tookVitamin: false,
      totalCalories: 789,
      totalProtein: null,
      totalFat: null,
      totalCarbs: null,
      workoutTime: null,
      totalSugar: null,
      userId: "66ba131c28cab4e56202b716",
      userName: "Cleve",
    },
    {
      id: 2,
      weight: 103,
      createdAt: "Monday, April 15, 2025",
      updatedAt: "2025-04-15T06:46:07.847Z",
      isActive: true,
      isDeleted: false,
      tookFatburner: false,
      tookWeightmanagement: false,
      tookVitamin: false,
      totalCalories: 1091,
      totalProtein: null,
      totalFat: null,
      totalCarbs: null,
      workoutTime: null,
      totalSugar: null,
      userId: "66ba131c28cab4e56202b716",
      userName: "Cleve",
    },
  ];
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
          <WeightGraph data={data} month={'05'} />
          <CalorieGraph data={data} month={'05'} />
        </div>
        <div className="w-full my-5 flex-1">
          <Dashboard_table data={data} month={'05'} demo={'demo'} />
        </div>
      </div>
    </div>
  );
}

export default Demo;

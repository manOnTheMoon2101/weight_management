"use client";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AiOutlineExport } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Cousine } from "next/font/google";
const cousine = Cousine({
  subsets: ["latin"],
  weight: "400",
});
export function Dashboard_table() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const data = [
    {
      id: "66d4b05bedb0716a6987942e",
      weight: 94.95,
      createdAt: "Sun Sep 01 2024",
      updatedAt: "2024-09-01T18:20:11.151Z",
      isActive: true,
      isDeleted: false,
      tookFatburner: false,
      tookWeightmanagement: false,
      tookVitamin: false,
      totalCalories: 3832,
      totalProtein: 100,
      totalFat: 166.2,
      totalCarbs: 672,
      workoutTime: null,
      totalSugar: 299,
      userId: "66ba131c28cab4e56202b716",
      userName: "Cleve",
    },
    {
      id: "66d547ab4460862162599ea5",
      weight: 96,
      createdAt: "Mon Sep 02 2024",
      updatedAt: "2024-09-02T17:44:01.425Z",
      isActive: true,
      isDeleted: false,
      tookFatburner: true,
      tookWeightmanagement: true,
      tookVitamin: false,
      totalCalories: 767,
      totalProtein: 81,
      totalFat: 33,
      totalCarbs: 49,
      workoutTime: null,
      totalSugar: 24,
      userId: "66ba131c28cab4e56202b716",
      userName: "Cleve",
    },
    {
      id: "66d6984e2d5ca3b51f6d873b",
      weight: 94.75,
      createdAt: "Tue Sep 03 2024",
      updatedAt: "2024-09-03T17:57:04.921Z",
      isActive: true,
      isDeleted: false,
      tookFatburner: true,
      tookWeightmanagement: true,
      tookVitamin: false,
      totalCalories: 1104,
      totalProtein: 68.6,
      totalFat: 23.6,
      totalCarbs: 158,
      workoutTime: null,
      totalSugar: 78.6,
      userId: "66ba131c28cab4e56202b716",
      userName: "Cleve",
    },
    {
      id: "66d805d4f7eeb33a6cb2b574",
      weight: 94.85,
      createdAt: "Wed Sep 04 2024",
      updatedAt: "2024-09-04T17:18:22.127Z",
      isActive: true,
      isDeleted: false,
      tookFatburner: true,
      tookWeightmanagement: true,
      tookVitamin: false,
      totalCalories: 1404,
      totalProtein: 113,
      totalFat: 67,
      totalCarbs: 85,
      workoutTime: null,
      totalSugar: 27,
      userId: "66ba131c28cab4e56202b716",
      userName: "Cleve",
    },
    {
      id: "66d970789a4237500957bd8b",
      weight: 94,
      createdAt: "Thu Sep 05 2024",
      updatedAt: "2024-09-05T17:14:22.457Z",
      isActive: true,
      isDeleted: false,
      tookFatburner: true,
      tookWeightmanagement: true,
      tookVitamin: false,
      totalCalories: 2302,
      totalProtein: 129,
      totalFat: 114,
      totalCarbs: 218,
      workoutTime: null,
      totalSugar: 75,
      userId: "66ba131c28cab4e56202b716",
      userName: "Cleve",
    },
    {
      id: "66daa32580eb5de60c60fbe9",
      weight: 92.95,
      createdAt: "Fri Sep 06 2024",
      updatedAt: "2024-09-07T07:29:12.519Z",
      isActive: true,
      isDeleted: false,
      tookFatburner: true,
      tookWeightmanagement: true,
      tookVitamin: false,
      totalCalories: 3093,
      totalProtein: 157,
      totalFat: 157,
      totalCarbs: 270,
      workoutTime: null,
      totalSugar: 80,
      userId: "66ba131c28cab4e56202b716",
      userName: "Cleve",
    },
    {
      id: "66dc003caa230960cd09c864",
      weight: 93.25,
      createdAt: "Sat Sep 07 2024",
      updatedAt: "2024-09-08T19:01:43.532Z",
      isActive: true,
      isDeleted: false,
      tookFatburner: false,
      tookWeightmanagement: false,
      tookVitamin: false,
      totalCalories: 3560,
      totalProtein: 126,
      totalFat: 189.5,
      totalCarbs: 572,
      workoutTime: null,
      totalSugar: 158,
      userId: "66ba131c28cab4e56202b716",
      userName: "Cleve",
    },
    {
      id: "66ddf5a90bf98f5d37435f20",
      weight: 95.95,
      createdAt: "Sun Sep 08 2024",
      updatedAt: "2024-09-08T19:06:17.249Z",
      isActive: true,
      isDeleted: false,
      tookFatburner: false,
      tookWeightmanagement: false,
      tookVitamin: false,
      totalCalories: 1026,
      totalProtein: 57,
      totalFat: 60,
      totalCarbs: 110,
      workoutTime: null,
      totalSugar: 51,
      userId: "66ba131c28cab4e56202b716",
      userName: "Cleve",
    },
    {
      id: "66de99a868098b7c074b3efa",
      weight: 96.15,
      createdAt: "Mon Sep 09 2024",
      updatedAt: "2024-09-09T18:02:39.131Z",
      isActive: true,
      isDeleted: false,
      tookFatburner: true,
      tookWeightmanagement: true,
      tookVitamin: false,
      totalCalories: 1314,
      totalProtein: 120,
      totalFat: 33,
      totalCarbs: 140,
      workoutTime: null,
      totalSugar: 17.45,
      userId: "66ba131c28cab4e56202b716",
      userName: "Cleve",
    },
  ];
  const skeletons = Array.from({ length: 14 });
  if (isDesktop) {
    return (
      <>
        <div className="min-w-full overflow-x-auto border rounded">
          {/* <h3 className={`${anek.className} text-2xl m-5`}>Dashboard</h3> */}
          <table className="table-auto min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">Open</th>
                <th className="px-4 py-2  text-center">Date</th>
                <th className="px-4 py-2  text-center">Weight</th>
                <th className="px-4 py-2  text-center">Calories</th>
                <th className="px-4 py-2  text-center">Protein</th>
                <th className="px-4 py-2  text-center">Fat</th>
                <th className="px-4 py-2  text-center">Carbohydrates</th>
                <th className="px-4 py-2  text-center">Sugar</th>
                <th className="px-4 py-2  text-center">Vitamin</th>
                <th className="px-4 py-2  text-center">CLA</th>
                <th className="px-4 py-2  text-center">L-Carnitine</th>
              </tr>
            </thead>
            {data.map((x: any) => (
              <tbody>
                <tr key={x.id}>
                  <td className="border-b px-4 py-2 text-center">
                    <Dialog>
                      <DialogTrigger>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <AiOutlineExport />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Open Modal</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      <DialogContent>{/* <ViewModal x={x} /> */}</DialogContent>
                    </Dialog>
                  </td>
                  <td
                    className={`border-b px-4 py-2  text-center ${cousine.className}`}
                  >
                    {x.createdAt}
                  </td>
                  <td
                    className={`border-b px-4 py-2  text-center ${cousine.className}`}
                  >
                    {x.weight}
                  </td>
                  <td
                    className={`border-b px-4 py-2 ${
                      cousine.className
                    }  text-center  ${
                      x.totalCalories > 2000 ? "text-red-500" : ""
                    }`}
                  >
                    {x.totalCalories}
                  </td>
                  <td
                    className={`border-b px-4 py-2  text-center ${
                      cousine.className
                    }  ${x.totalProtein < 70 ? "text-red-500" : ""}`}
                  >
                    {x.totalProtein}
                  </td>
                  <td
                    className={`border-b px-4 py-2  ${
                      cousine.className
                    }  text-center  ${x.totalFat > 67 ? "text-red-500" : ""}`}
                  >
                    {x.totalFat}
                  </td>
                  <td
                    className={`border-b px-4 py-2  text-center ${
                      cousine.className
                    } ${x.totalCarbs > 120 ? "text-red-500" : ""} `}
                  >
                    {x.totalCarbs}
                  </td>
                  <td
                    className={`border-b px-4 py-2  text-center ${
                      cousine.className
                    } ${x.totalSugar > 30 ? "text-red-500" : ""} `}
                  >
                    {x.totalSugar}
                  </td>

                  <td
                    className={`border-b px-4 py-2  text-center ${cousine.className}`}
                  >
                    {x.tookVitamin ? "💊" : ""}
                  </td>
                  <td
                    className={`border-b px-4 py-2  text-center ${cousine.className}`}
                  >
                    {x.tookWeightmanagement ? "💊" : ""}
                  </td>
                  <td
                    className={`border-b px-4 py-2  text-center ${cousine.className}`}
                  >
                    {x.tookFatburner ? "💊" : ""}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div className="flex flex-row justify-center">
            <h3 className="text-2xl">
              {" "}
              {data.length <= 0 ? "No Data Found..." : ""}
            </h3>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-w-full overflow-x-auto border rounded">
        <table className="table-auto min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center">Open</th>
              <th className="px-4 py-2  text-center">Date</th>
              <th className="px-4 py-2  text-center">Weight</th>
              <th className="px-4 py-2  text-center">Calories</th>
              <th className="px-4 py-2  text-center">Protein</th>
              <th className="px-4 py-2  text-center">Fat</th>
              <th className="px-4 py-2  text-center">Carbohydrates</th>
              <th className="px-4 py-2  text-center">Sugar</th>
              <th className="px-4 py-2  text-center">Vitamin</th>
              <th className="px-4 py-2  text-center">CLA</th>
              <th className="px-4 py-2  text-center">L-Carnitine</th>
            </tr>
          </thead>
          {data.map((x: any) => (
            <tbody>
              <tr key={x.id}>
                <td className="border-b px-4 py-2 text-center">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <AiOutlineExport />
                    </DrawerTrigger>
                    <DrawerContent>{/* <ViewModal x={x} /> */}</DrawerContent>
                  </Drawer>
                </td>
                <td
                  className={`border-b px-4 py-2  text-center ${cousine.className}`}
                >
                  {x.createdAt}
                </td>
                <td
                  className={`border-b px-4 py-2  text-center ${cousine.className}`}
                >
                  {x.weight}
                </td>
                <td
                  className={`border-b px-4 py-2 ${
                    cousine.className
                  }  text-center  ${
                    x.totalCalories > 2000 ? "text-red-500" : ""
                  }`}
                >
                  {x.totalCalories}
                </td>
                <td
                  className={`border-b px-4 py-2  text-center ${
                    cousine.className
                  }  ${x.totalProtein < 70 ? "text-red-500" : ""}`}
                >
                  {x.totalProtein}
                </td>
                <td
                  className={`border-b px-4 py-2  ${
                    cousine.className
                  }  text-center  ${x.totalFat > 67 ? "text-red-500" : ""}`}
                >
                  {x.totalFat}
                </td>
                <td
                  className={`border-b px-4 py-2  text-center ${
                    cousine.className
                  } ${x.totalCarbs > 120 ? "text-red-500" : ""} `}
                >
                  {x.totalCarbs}
                </td>
                <td
                  className={`border-b px-4 py-2  text-center ${
                    cousine.className
                  } ${x.totalSugar > 30 ? "text-red-500" : ""} `}
                >
                  {x.totalSugar}
                </td>

                <td
                  className={`border-b px-4 py-2  text-center ${cousine.className}`}
                >
                  {x.tookVitamin ? "💊" : ""}
                </td>
                <td
                  className={`border-b px-4 py-2  text-center ${cousine.className}`}
                >
                  {x.tookWeightmanagement ? "💊" : ""}
                </td>
                <td
                  className={`border-b px-4 py-2  text-center ${cousine.className}`}
                >
                  {x.tookFatburner ? "💊" : ""}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="flex flex-row justify-center">
          <h3 className="text-2xl">
            {" "}
            {data.length <= 0 ? "No Data Found..." : ""}
          </h3>
        </div>
      </div>
    </>
  );
}

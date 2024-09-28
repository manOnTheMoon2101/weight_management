"use client";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import React from "react";
import useSWR from "swr";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AiOutlineExport } from "react-icons/ai";
import ViewModal from "../modals/viewModal/ViewModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SkeletonHolder from "./skeleton/skeletonHolder";
import { Cousine } from "next/font/google";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { FaInfoCircle } from "react-icons/fa";
const cousine = Cousine({
  subsets: ["latin"],
  weight: "400",
});
export function Dashboard_table(data: any) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const skeletons = Array.from({ length: 14 });
  if (isDesktop) {
    return (
      <>
        <div className="min-w-full overflow-x-auto border rounded h-80">
          {/* <h3 className={`${anek.className} text-2xl m-5`}>Dashboard</h3> */}
          <table className="table-auto min-w-full">
            <thead>
              <tr className="sticky top-0 bg-background">
                <th className="px-4 py-2 text-center">Open</th>
                <th className="px-4 py-2  text-center">Date</th>
                <th className="px-4 py-2  text-center">Weight</th>
                <th className="px-4 py-2  text-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex flex-row justify-center">
                        Calories{" "}
                        <FaInfoCircle className="hover:text-orange-400" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="text-center">
                      <div className="flex flex-row justify-around">
                        <div>
                          <h3>Min</h3>
                          <Badge className="bg-orange-400 text-white">0</Badge>
                        </div>
                        <div>
                          <h3>Max</h3>
                          <Badge className="bg-orange-400 text-white">
                            2000
                          </Badge>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </th>
                <th className="px-4 py-2  text-center">
                  {" "}
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex flex-row justify-center">
                        Protein{" "}
                        <FaInfoCircle className="hover:text-orange-400" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="text-center">
                      <div className="flex flex-row justify-around">
                        <div>
                          <h3>Min</h3>
                          <Badge className="bg-orange-400 text-white">70</Badge>
                        </div>
                        <div>
                          <h3>Max</h3>
                          <Badge className="bg-orange-400 text-white">
                            200
                          </Badge>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </th>
                <th className="px-4 py-2  text-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex flex-row justify-center">
                        Fat <FaInfoCircle className="hover:text-orange-400" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="text-center">
                      <div className="flex flex-row justify-around">
                        <div>
                          <h3>Min</h3>
                          <Badge className="bg-orange-400 text-white">0</Badge>
                        </div>
                        <div>
                          <h3>Max</h3>
                          <Badge className="bg-orange-400 text-white">67</Badge>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </th>
                <th className="px-4 py-2  text-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex flex-row justify-center">
                        Carbs
                        <FaInfoCircle className="hover:text-orange-400" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="text-center">
                      <div className="flex flex-row justify-around">
                        <div>
                          <h3>Min</h3>
                          <Badge className="bg-orange-400 text-white">0</Badge>
                        </div>
                        <div>
                          <h3>Max</h3>
                          <Badge className="bg-orange-400 text-white">
                            120
                          </Badge>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </th>
                <th className="px-4 py-2  text-center">
                  {" "}
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex flex-row justify-center">
                        Sugar
                        <FaInfoCircle className="hover:text-orange-400" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="text-center">
                      <div className="flex flex-row justify-around">
                        <div>
                          <h3>Min</h3>
                          <Badge className="bg-orange-400 text-white">0</Badge>
                        </div>
                        <div>
                          <h3>Max</h3>
                          <Badge className="bg-orange-400 text-white">30</Badge>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </th>
                <th className="px-4 py-2  text-center">Vitamin</th>
                <th className="px-4 py-2  text-center">CLA</th>
                <th className="px-4 py-2  text-center">L-Carnitine</th>
              </tr>
            </thead>
            {data.data.map((x: any) => (
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
                      <DialogContent>
                        <ViewModal x={x} />
                      </DialogContent>
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
              {data.data.length <= 0 ? "No Data Found..." : ""}
            </h3>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-w-full overflow-x-auto border rounded h-96">
        <table className="table-auto min-w-full">
          <thead>
            <tr className="sticky top-0 bg-background">
              <th className="px-4 py-2 text-center">Open</th>
              <th className="px-4 py-2  text-center">Date</th>
              <th className="px-4 py-2  text-center">Weight</th>
              <th className="px-4 py-2  text-center">
                {" "}
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex flex-row justify-center">
                      Calories{" "}
                      <FaInfoCircle className="hover:text-orange-400" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="text-center">
                    <div className="flex flex-row justify-around">
                      <div>
                        <h3>Min</h3>
                        <Badge className="bg-orange-400 text-white">0</Badge>
                      </div>
                      <div>
                        <h3>Max</h3>
                        <Badge className="bg-orange-400 text-white">2000</Badge>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </th>
              <th className="px-4 py-2  text-center">
                {" "}
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex flex-row justify-center">
                      Protein <FaInfoCircle className="hover:text-orange-400" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="text-center">
                    <div className="flex flex-row justify-around">
                      <div>
                        <h3>Min</h3>
                        <Badge className="bg-orange-400 text-white">70</Badge>
                      </div>
                      <div>
                        <h3>Max</h3>
                        <Badge className="bg-orange-400 text-white">200</Badge>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </th>
              <th className="px-4 py-2  text-center">
                {" "}
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex flex-row justify-center">
                      Fat <FaInfoCircle className="hover:text-orange-400" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="text-center">
                    <div className="flex flex-row justify-around">
                      <div>
                        <h3>Min</h3>
                        <Badge className="bg-orange-400 text-white">0</Badge>
                      </div>
                      <div>
                        <h3>Max</h3>
                        <Badge className="bg-orange-400 text-white">67</Badge>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </th>
              <th className="px-4 py-2  text-center">
                {" "}
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex flex-row justify-center">
                      Carbs
                      <FaInfoCircle className="hover:text-orange-400" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="text-center">
                    <div className="flex flex-row justify-around">
                      <div>
                        <h3>Min</h3>
                        <Badge className="bg-orange-400 text-white">0</Badge>
                      </div>
                      <div>
                        <h3>Max</h3>
                        <Badge className="bg-orange-400 text-white">120</Badge>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </th>
              <th className="px-4 py-2  text-center">
                {" "}
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex flex-row justify-center">
                      Sugar
                      <FaInfoCircle className="hover:text-orange-400" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="text-center">
                    <div className="flex flex-row justify-around">
                      <div>
                        <h3>Min</h3>
                        <Badge className="bg-orange-400 text-white">0</Badge>
                      </div>
                      <div>
                        <h3>Max</h3>
                        <Badge className="bg-orange-400 text-white">30</Badge>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </th>
              <th className="px-4 py-2  text-center">Vitamin</th>
              <th className="px-4 py-2  text-center">CLA</th>
              <th className="px-4 py-2  text-center">L-Carnitine</th>
            </tr>
          </thead>
          {data.data.map((x: any) => (
            <tbody>
              <tr key={x.id}>
                <td className="border-b px-4 py-2 text-center">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <AiOutlineExport />
                    </DrawerTrigger>
                    <DrawerContent>
                      <ViewModal x={x} />
                    </DrawerContent>
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
            {data.data.length <= 0 ? "No Data Found..." : ""}
          </h3>
        </div>
      </div>
    </>
  );
}

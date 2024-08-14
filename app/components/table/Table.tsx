"use client";
import React from "react";
import useSWR from "swr";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AiOutlineExport } from "react-icons/ai";
import ViewModal from "../body/components/viewModal/ViewModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SkeletonHolder from "./skeleton/skeletonHolder";
import { Cousine } from "next/font/google";
import { Anek_Devanagari } from "next/font/google";
const anek = Anek_Devanagari({
  subsets: ["latin"],
  weight: "400",
});
const cousine = Cousine({
  subsets: ["latin"],
  weight: "400",
});
function Dashboard_table(date: any) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/filter/${date.month}`,
    fetcher
  );
  const skeletons = Array.from({ length: 7 });
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <>
        <div className="min-w-full">
          <table className="table-auto min-w-full  border">
            <thead>
              <tr className="bg-orange-400">
                <th className="px-4 py-2 text-center">Open</th>
                <th className="px-4 py-2  text-center">Date</th>
                <th className="px-4 py-2  text-center">Weight</th>
                <th className="px-4 py-2  text-center">Calories</th>
                <th className="px-4 py-2  text-center">Protein</th>
                <th className="px-4 py-2  text-center">Fat</th>
                <th className="px-4 py-2  text-center">Carbohydrates</th>
                <th className="px-4 py-2  text-center">Sugar</th>

                <th className="px-4 py-2  text-center">Vitamin?</th>
                <th className="px-4 py-2  text-center">CLA?</th>
                <th className="px-4 py-2  text-center">L-Carnitine?</th>
              </tr>
            </thead>

            <tbody>
              {skeletons.map((_, index) => (
                <SkeletonHolder key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  return (
    <>
      <div className="min-w-full overflow-x-auto border rounded">
        <h3 className={`${anek.className} text-2xl m-5`}>Dashboard</h3>
        <table className="table-auto min-w-full border">
          <thead>
            <tr className="bg-orange-400">
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
                <td className="border px-4 py-2 text-center">
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
                  className={`border px-4 py-2  text-center ${cousine.className}`}
                >
                  {x.createdAt}
                </td>
                <td
                  className={`border px-4 py-2  text-center ${cousine.className}`}
                >
                  {x.weight}
                </td>
                <td
                  className={`border px-4 py-2 ${
                    cousine.className
                  }  text-center  ${
                    x.totalCalories > 2000 ? "text-red-500" : ""
                  }`}
                >
                  {x.totalCalories}
                </td>
                <td
                  className={`border px-4 py-2  text-center ${
                    cousine.className
                  }  ${x.totalProtein < 70 ? "text-red-500" : ""}`}
                >
                  {x.totalProtein}
                </td>
                <td
                  className={`border px-4 py-2  ${
                    cousine.className
                  }  text-center  ${x.totalFat > 67 ? "text-red-500" : ""}`}
                >
                  {x.totalFat}
                </td>
                <td
                  className={`border px-4 py-2  text-center ${
                    cousine.className
                  } ${x.totalCarbs > 120 ? "text-red-500" : ""} `}
                >
                  {x.totalCarbs}
                </td>
                <td
                  className={`border px-4 py-2  text-center ${
                    cousine.className
                  } ${x.totalSugar > 30 ? "text-red-500" : ""} `}
                >
                  {x.totalSugar}
                </td>

                <td
                  className={`border px-4 py-2  text-center ${cousine.className}`}
                >
                  {x.tookVitamin ? "💊" : ""}
                </td>
                <td
                  className={`border px-4 py-2  text-center ${cousine.className}`}
                >
                  {x.tookWeightmanagement ? "💊" : ""}
                </td>
                <td
                  className={`border px-4 py-2  text-center ${cousine.className}`}
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

export default Dashboard_table;

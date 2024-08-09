"use client";
import React from "react";
import useSWR from "swr";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AiOutlineExport } from "react-icons/ai";
import { CiPill } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import ViewModal from "../body/components/viewModal/ViewModal";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonHolder from "./skeleton/skeletonHolder";
function Dashboard_table(date: any) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/filter/${date.month}`,
    fetcher
  );
  const skeletons = Array.from({ length: 14 });
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
          {data.map((x: any) => (
            <tbody>
              <tr key={x.id}>
                <td className="border px-4 py-2 text-center">
                  <Dialog>
                    <DialogTrigger>
                      <AiOutlineExport />
                    </DialogTrigger>
                    <DialogContent>
                      <ViewModal x={x} />
                    </DialogContent>
                  </Dialog>
                </td>
                <td className="border px-4 py-2  text-center">{x.createdAt}</td>
                <td className="border px-4 py-2  text-center">{x.weight}</td>
                <td
                  className={`border px-4 py-2  text-center  ${
                    x.totalCalories > 200 ? "text-red-500" : ""
                  }`}
                >
                  {x.totalCalories}
                </td>
                <td className="border px-4 py-2  text-center">
                  {x.totalProtein}
                </td>
                <td
                  className={`border px-4 py-2  text-center  ${
                    x.totalFat > 100 ? "text-red-500" : ""
                  }`}
                >
                  {x.totalFat}
                </td>
                <td className="border px-4 py-2  text-center">
                  {x.totalCarbs}
                </td>
                <td className="border px-4 py-2  text-center">
                  {x.totalSugar}
                </td>

                <td className="border px-4 py-2  text-center">
                  {x.tookVitamin ? "💊" : ""}
                </td>
                <td className="border px-4 py-2  text-center">
                  {x.tookWeightmanagement ? "💊" : ""}
                </td>
                <td className="border px-4 py-2  text-center">
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

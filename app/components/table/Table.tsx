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
import { Button } from "@/components/ui/button";
import ViewModal from "../body/components/viewModal/ViewModal";
function Dashboard_table(date: any) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/filter/${date.month}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <div className="min-w-full">
        <table className="table-auto min-w-full  border">
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
                <td className="border px-4 py-2  text-center">
                  {x.totalCalories}
                </td>
                <td className="border px-4 py-2  text-center">
                  {x.totalProtein}
                </td>
                <td className="border px-4 py-2  text-center">{x.totalFat}</td>
                <td className="border px-4 py-2  text-center">
                  {x.totalCarbs}
                </td>
                <td className="border px-4 py-2  text-center">
                  {x.totalSugar}
                </td>

                <td className="border px-4 py-2  text-center">
                  {x.tookVitamin == true ? "true" : "false"}
                </td>
                <td className="border px-4 py-2  text-center">
                  {x.tookWeightmanagement == true ? "true" : "false"}
                </td>
                <td className="border px-4 py-2  text-center">
                  {x.tookFatburner == true ? "true" : "false"}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="flex flex-row justify-center">
          {data.length <= 0 ? "No Data" : ""}
        </div>
      </div>
    </>
  );
}

export default Dashboard_table;

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
function Dashboard() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/data", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <div className="min-w-full bg-white">
        <table className="table-auto min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-black text-center bg-slate-900 text-white">
                Open
              </th>
              <th className="px-4 py-2 text-black text-center">Date</th>
              <th className="px-4 py-2 text-black text-center">Weight</th>
              <th className="px-4 py-2 text-black text-center">Food</th>
              <th className="px-4 py-2 text-black text-center">Protein</th>
              <th className="px-4 py-2 text-black text-center">Fat</th>
              <th className="px-4 py-2 text-black text-center">
                Carbohydrates
              </th>
              <th className="px-4 py-2 text-black text-center">Sugar</th>

              <th className="px-4 py-2 text-black text-center">Vitamin?</th>
              <th className="px-4 py-2 text-black text-center">CLA?</th>
              <th className="px-4 py-2 text-black text-center">L-Carnitine?</th>
            </tr>
          </thead>
          {data.map((x: any) => (
            <tbody>
              <tr key={x.id}>
                <td className="border px-4 py-2 text-black text-center">
                  <Dialog>
                    <DialogTrigger>
                      <AiOutlineExport />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{x.createdAt}</DialogTitle>
                        <DialogDescription>weight:{x.weight}</DialogDescription>

                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button>Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently remove your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button>Edit</Button>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </td>
                <td className="border px-4 py-2 text-black text-center">
                  {x.createdAt}
                </td>
                <td className="border px-4 py-2 text-black text-center">
                  {x.weight}
                </td>
                <td className="border px-4 py-2 text-black text-center">
                  {x.foodsInt == null ? x.foodsInt : "No Food(wow!)"}
                </td>
                <td className="border px-4 py-2 text-black text-center">
                  {x.totalProtein}
                </td>
                <td className="border px-4 py-2 text-black text-center">
                  {x.totalFat}
                </td>
                <td className="border px-4 py-2 text-black text-center">
                  {x.totalCarbs}
                </td>
                <td className="border px-4 py-2 text-black text-center">
                  {x.totalSugar}
                </td>

                <td className="border px-4 py-2 text-black text-center">
                  {x.tookVitamin == true ? "true" : "false"}
                </td>
                <td className="border px-4 py-2 text-black text-center">
                  {x.tookWeightmanagement == true ? "true" : "false"}
                </td>
                <td className="border px-4 py-2 text-black text-center">
                  {x.tookFatburner == true ? "true" : "false"}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

export default Dashboard;

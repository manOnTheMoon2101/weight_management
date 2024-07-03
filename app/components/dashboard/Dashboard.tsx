"use client";
import React from "react";
import useSWR from "swr";

function Dashboard() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/data", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      {data.map((x: any) => (
        <div className="min-w-full bg-white">
          <table className="table-auto min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
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
                <th className="px-4 py-2 text-black text-center">
                  L-Carnitine?
                </th>
              </tr>
            </thead>
            <tbody>
              <tr key={x.id}>
                <td className="border px-4 py-2 text-black text-center">
                  {x.weight}
                </td>
                <td className="border px-4 py-2 text-black text-center">
                  {x.foodsInt == null ? x.foodsInt : "no Foods"}
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
          </table>
        </div>
      ))}
    </>
  );
}

export default Dashboard;

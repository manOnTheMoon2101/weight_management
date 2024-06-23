"use client";
import React from "react";
import useSWR from "swr";

function Dashboard() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/food", fetcher);
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="min-w-full bg-white">
      <table className="table-auto min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-black text-center">Weight</th>
            <th className="px-4 py-2 text-black text-center">Food</th>
            <th className="px-4 py-2 text-black text-center">Protein</th>
            <th className="px-4 py-2 text-black text-center">Fat</th>
            <th className="px-4 py-2 text-black text-center">Carbohydrates</th>
            <th className="px-4 py-2 text-black text-center">Sugar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 text-black text-center">Data 1</td>
            <td className="border px-4 py-2 text-black text-center">Data 2</td>
            <td className="border px-4 py-2 text-black text-center">Data 3</td>
            <td className="border px-4 py-2 text-black text-center">Data 4</td>
            <td className="border px-4 py-2 text-black text-center">Data 5</td>
            <td className="border px-4 py-2 text-black text-center">Data 6</td>
          </tr>
        </tbody>
      </table>
      {/* <p className="text-black">{data.map((x: any) => x.name)}</p> */}
    </div>
  );
}

export default Dashboard;

import React from "react";

function Dashboard() {
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
    </div>
  );
}

export default Dashboard;

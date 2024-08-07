import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const SkeletonHolder = () => {
  return (
    <>
      <tr>
        <td className="border px-4 py-2 text-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </td>
        <td className="border px-4 py-2  text-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </td>
        <td className="border px-4 py-2  text-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </td>
        <td className="border px-4 py-2  text-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </td>
        <td className="border px-4 py-2  text-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </td>
        <td className="border px-4 py-2  text-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </td>
        <td className="border px-4 py-2  text-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </td>
        <td className="border px-4 py-2  text-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </td>

        <td className="border px-4 py-2  text-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </td>
        <td className="border px-4 py-2  text-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </td>
        <td className="border px-4 py-2  text-center">
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </td>
      </tr>
    </>
  );
};

export default SkeletonHolder;

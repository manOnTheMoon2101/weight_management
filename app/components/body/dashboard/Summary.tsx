"use client";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { Badge } from "@/components/ui/badge";
import { Cousine } from "next/font/google";
const cousine = Cousine({
  subsets: ["latin"],
  weight: "400",
});

export function Summary(date: any) {
  function getAverage(numbers: any) {
    if (numbers.length === 0) return null;

    const sum = numbers.reduce((acc: any, current: any) => acc + current, 0);

    const average = sum / numbers.length;

    return parseFloat(average.toFixed(2));
  }
  function getMin(numbers: string | any[]) {
    if (numbers.length === 0) {
      return null;
    }
    let min = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] < min) {
        min = numbers[i];
      }
    }
    return min;
  }
  function getMax(numbers: string | any[]) {
    if (numbers.length === 0) {
      return null;
    }
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] > max) {
        max = numbers[i];
      }
    }
    return max;
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/filter/${date.month}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="w-[100%] h-[300px] mt-5" />
      </div>
    );
  return (
    <div className={`text-center m-5 ${cousine.className} w-1/4`}>
      <div className="m-5 ">
        <h2>Average Calories</h2>
        <Badge className="bg-orange-400 text-white">
          {" "}
          {getAverage(
            data.map((x: any) => (x.totalCalories ? x.totalCalories : ""))
          )}
        </Badge>
      </div>
      <div className="m-5">
        <h2 className="">Average Weight</h2>
        <Badge className="bg-orange-400 text-white">
          {" "}
          {getAverage(data.map((x: any) => (x.weight ? x.weight : "")))}
        </Badge>
      </div>
      <div className="m-5">
        <h2>Min Weight</h2>
        <Badge className="bg-orange-400 text-white">
          {getMin(data.map((x: any) => (x.weight ? x.weight : "")))}
        </Badge>
      </div>

      <div className="m-5">
        <h2>Max Weight</h2>
        <Badge className="bg-orange-400 text-white">
          {getMax(data.map((x: any) => (x.weight ? x.weight : "")))}
        </Badge>
      </div>
    </div>
  );
}

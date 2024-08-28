"use client";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";

export function Summary(date: any) {
  function getAverage(numbers: any) {
    if (numbers.length === 0) return 0;

    const sum = numbers.reduce((acc: any, current: any) => acc + current, 0);

    const average = sum / numbers.length;

    return parseFloat(average.toFixed(2));
  }
  function getMin(numbers: string | any[]) {
    if (numbers.length === 0) {
      throw new Error("Array cannot be empty");
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
      throw new Error("Array cannot be empty");
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
    <div>
      <div>
        <h2>Average Weight</h2>
        {getAverage(data.map((x: any) => x.weight))}
      </div>

      <div>
        <h2>Average Calories</h2>
        {getAverage(data.map((x: any) => x.totalCalories))}
      </div>

      <div>
        <h2>Min Weight</h2>
        {getMin(data.map((x: any) => x.weight))}
      </div>

      <div>
        <h2>Max Weight</h2>
        {getMax(data.map((x: any) => x.weight))}
      </div>
    </div>
  );
}

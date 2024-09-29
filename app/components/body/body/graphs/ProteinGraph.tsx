"use client";
import useSWR from "swr";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Acme } from "next/font/google";
import { useRef } from "react";
import months from "@/lib/files/months.json";
import { Anek_Devanagari } from "next/font/google";
const anek = Anek_Devanagari({
  subsets: ["latin"],
  weight: "400",
});
const acme = Acme({
  subsets: ["latin"],
  weight: "400",
});
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
import React from "react";
import { GraphMenu } from "./components/Menu/Menu";
function getMonthName(value: any) {
  const month = months.find((month) => month.value === value);
  return month ? month.name : null;
}
const ProteinGraph = (data: any) => {
  const chartRef = useRef(null);
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
  console.log(data);
  const chartData =
    data?.data.map((item: any) => ({
      createdAt: new Date(item.createdAt).getDate(),
      protein: item.totalProtein,
    })) || [];
  const title = "Protein";
  return (
    <Card className="my-5" ref={chartRef}>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle className={`${anek.className}`}>{title}</CardTitle>
          <GraphMenu month={data.month} chartRef={chartRef} title={title} />
        </div>
        <CardDescription className={`${acme.className}`}>
          {getMonthName(data.month)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="createdAt" />
            <PolarGrid />
            <Radar
              dataKey="protein"
              name="Protein"
              fill="#fb923c"
              dot={{
                stroke: "rgb(251 146 60)",
                fill: "none",
              }}
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <div className="m-5 text-center">
                <h2 className="my-2">Min Protein</h2>
                <Badge className="bg-purple-900 text-white">
                  {getMin(
                    data.data.map((x: any) =>
                      x.totalProtein ? x.totalProtein : 0
                    )
                  )}
                </Badge>
              </div>
              <div className="m-5 text-center">
                <h2 className="my-2">Average Protein</h2>
                <Badge className="bg-purple-900 text-white">
                  {getAverage(
                    data.data.map((x: any) =>
                      x.totalProtein ? x.totalProtein : 0
                    )
                  )}
                </Badge>
              </div>
              <div className="m-5 text-center">
                <h2 className="my-2">Max Protein</h2>
                <Badge className="bg-purple-900 text-white">
                  {getMax(
                    data.data.map((x: any) =>
                      x.totalProtein ? x.totalProtein : 0
                    )
                  )}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProteinGraph;

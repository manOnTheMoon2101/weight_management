"use client";
import useSWR from "swr";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import months from "@/lib/files/months.json";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Acme } from "next/font/google";
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
import { Skeleton } from "@/components/ui/skeleton";
const Graph = (data: any) => {
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
  function getMonthName(value: any) {
    const month = months.find((month) => month.value === value);
    return month ? month.name : null;
  }
  const chartData =
    data?.data.map((item: any) => ({
      createdAt: new Date(item.createdAt).getDate(),
      weight: item.weight,
    })) || [];
  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle className={`${anek.className}`}>Weight Chart</CardTitle>
        <CardDescription className={`${acme.className}`}>
          {getMonthName(data.month)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <YAxis domain={[60, 100]} />
            <Area
              dataKey="weight"
              name="Weight(kg)"
              type="monotoneX"
              fill="none"
              stroke="rgb(251 146 60)"
              strokeWidth={1}
              dot={true}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none"></div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <div className="m-5 text-center">
                <h2 className="my-2">Min Weight</h2>
                <Badge className="bg-purple-900 text-white">
                  {getMin(data.data.map((x: any) => (x.weight ? x.weight : 0)))}
                </Badge>
              </div>
              <div className="m-5 text-center">
                <h2 className="my-2">Average Weight</h2>
                <Badge className="bg-purple-900 text-white">
                  {" "}
                  {getAverage(
                    data.data.map((x: any) => (x.weight ? x.weight : 0))
                  )}
                </Badge>
              </div>
              <div className="m-5 text-center">
                <h2 className="my-2">Max Weight</h2>
                <Badge className="bg-purple-900 text-white">
                  {getMax(data.data.map((x: any) => (x.weight ? x.weight : 0)))}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Graph;

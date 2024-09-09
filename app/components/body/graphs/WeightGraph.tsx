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
const Graph = (date: any) => {
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
  const months = [
    {
      text: "January",
      value: "01",
    },
    {
      text: "Febraury",
      value: "02",
    },
    {
      text: "March",
      value: "03",
    },
    {
      text: "April",
      value: "04",
    },
    {
      text: "May",
      value: "05",
    },
    {
      text: "June",
      value: "06",
    },
    {
      text: "July",
      value: "07",
    },
    {
      text: "August",
      value: "08",
    },
    {
      text: "September",
      value: "09",
    },
    {
      text: "October",
      value: "10",
    },
    {
      text: "November",
      value: "11",
    },
    {
      text: "December",
      value: "12",
    },
  ];
  const chartData =
    data?.map((item: any) => ({
      createdAt: new Date(item.createdAt).getDate(),
      weight: item.weight,
    })) || [];
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="w-[100%] h-[300px]" />
      </div>
    );

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle className={`${anek.className}`}>Weight Chart</CardTitle>
        <CardDescription className={`${acme.className}`}>
          {months.map((x: any) => (x.value == date.month ? x.text : ""))}
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
                  {getMin(data.map((x: any) => (x.weight ? x.weight : 0)))}
                </Badge>
              </div>
              <div className="m-5 text-center">
                <h2 className="my-2">Average Weight</h2>
                <Badge className="bg-purple-900 text-white">
                  {" "}
                  {getAverage(data.map((x: any) => (x.weight ? x.weight : 0)))}
                </Badge>
              </div>
              <div className="m-5 text-center">
                <h2 className="my-2">Max Weight</h2>
                <Badge className="bg-purple-900 text-white">
                  {getMax(data.map((x: any) => (x.weight ? x.weight : 0)))}
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

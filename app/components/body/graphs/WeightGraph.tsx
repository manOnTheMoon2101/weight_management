"use client";
import useSWR from "swr";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Acme } from "next/font/google";
import { Anek_Devanagari } from "next/font/google";
const anek = Anek_Devanagari({
  subsets: ['latin'],
  weight: "400"
})
const acme = Acme({
  subsets: ['latin'],
  weight: "400"
})
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
const Graph = (date: any) => {
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
    <div>
      <Card>
        <CardHeader>
          <CardTitle className={`${anek.className}`}>Weight Chart</CardTitle>
          <CardDescription  className={`${acme.className}`}>
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
              <Area
                dataKey="weight"
                type="monotoneX"
                fill="rgb(79, 23, 135)"
                stroke="rgb(251 146 60)"
                strokeWidth={2}
                dot={true}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Graph;

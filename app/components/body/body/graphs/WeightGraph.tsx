"use client";
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
import { FaWeightScale } from "react-icons/fa6";
import months from "@/lib/files/months.json";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Acme } from "next/font/google";
import { Anek_Devanagari } from "next/font/google";
import { useRef } from "react";
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
const Graph = (data: any) => {
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
  function getMonthName(value: any) {
    const month = months.find((month) => month.value === value);
    return month ? month.name : null;
  }

  const chartData =
    data?.data
      .map((item: any) => ({
        createdAt: new Date(item.createdAt).getTime(),
        weight: item.weight,
      }))
      .sort((a: any, b: any) => a.createdAt - b.createdAt)
      .map((item: { createdAt: string | number | Date; weight: any }) => ({
        createdAt: new Date(item.createdAt).getDate(),
        weight: item.weight,
      })) || [];
      const title = (
        <>
          <FaWeightScale className="inline-block" size={19} /> Weight
        </>
      );
  return (
    <Card className="my-5 mx-2 w-full" ref={chartRef}>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle className={`${anek.className}`}>{title}</CardTitle>
          {/* <GraphMenu month={data.month} chartRef={chartRef} title={title} /> */}
        </div>
        <CardDescription className={`${acme.className}`}>
        <Badge className="bg-primary">{getMonthName(data.month)}</Badge>
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
              tick={{ stroke: '#C4DAD2'}} 
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <YAxis domain={[60, 100]} tick={{ stroke: '#C4DAD2'}} />
            <Area
              dataKey="weight"
              name="Weight(kg)"
              type="monotoneX"
              fill="#E9EFEC"
              stroke="#E9EFEC"
              strokeWidth={1}
              dot={true}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row justify-center items-center">
        <div className="m-5 text-center">
          <h2 className="my-2">Min</h2>
          <Badge className="bg-primary text-white">
            {getMin(data.data.map((x: any) => (x.weight ? x.weight : 0)))}
          </Badge>
        </div>
        <div className="m-5 text-center">
          <h2 className="my-2">Average</h2>
          <Badge className="bg-primary text-white">
            {" "}
            {getAverage(data.data.map((x: any) => (x.weight ? x.weight : 0)))}
          </Badge>
        </div>
        <div className="m-5 text-center">
          <h2 className="my-2">Max</h2>
          <Badge className="bg-primary text-white">
            {getMax(data.data.map((x: any) => (x.weight ? x.weight : 0)))}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Graph;

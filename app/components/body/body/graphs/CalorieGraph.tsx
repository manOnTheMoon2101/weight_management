"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  LabelList,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import months from "@/lib/files/months.json";
import { Zap } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Acme } from "next/font/google";
import { Anek_Devanagari } from "next/font/google";
import { GraphMenu } from "./components/Menu/Menu";
import { FaBolt } from "react-icons/fa6";
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
export function CalorieGraph(data: any) {
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
        totalCalories: item.totalCalories,
      }))
      .sort((a: any, b: any) => a.createdAt - b.createdAt)
      .map(
        (item: { createdAt: string | number | Date; totalCalories: any }) => ({
          createdAt: new Date(item.createdAt).getDate(),
          totalCalories: item.totalCalories,
        })
      ) || [];

  const title = (
    <div className="items-center">
      <Zap className="inline-block mx-2" size={19} /> 
      <span>Calories</span>
    </div>
  );
  return (
    <Card className="my-5 mx-2 w-full shadow-lg" ref={chartRef}>
     <CardHeader className="flex flex-row justify-between items-center">
        {title}
        <Badge className={`${acme.className} bg-primary text-white`}>
          {getMonthName(data.month)}
        </Badge>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ stroke: "hsl(var(--foreground))" }}
            />
            <YAxis domain={[0]} tick={{ stroke: "hsl(var(--foreground))" }} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="totalCalories"
              name="Calories"
              className="fill-accent"
              stroke="#A87C7C"
              radius={8}
            >
              <LabelList
                position={"center"}
                angle={270}
                offset={0}
                className="fill-white"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row justify-center items-center">
        <div className="m-5 text-center">
          <h2 className="my-2">Min</h2>
          <Badge className="bg-primary text-white">
            {getMin(
              data.data.map((x: any) => (x.totalCalories ? x.totalCalories : 0))
            )}
          </Badge>
        </div>
        <div className="m-5 text-center">
          <h2 className="my-2">Average</h2>
          <Badge className="bg-primary text-white">
            {getAverage(
              data.data.map((x: any) => (x.totalCalories ? x.totalCalories : 0))
            )}
          </Badge>
        </div>
        <div className="m-5 text-center">
          <h2 className="my-2">Max</h2>
          <Badge className="bg-primary text-white">
            {getMax(
              data.data.map((x: any) => (x.totalCalories ? x.totalCalories : 0))
            )}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}

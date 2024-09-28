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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Acme } from "next/font/google";
import { Anek_Devanagari } from "next/font/google";
import { GraphMenu } from "./components/Menu/Menu";
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
      createdAt: new Date(item.createdAt).getDate(), // Format date as needed
      totalCalories: item.totalCalories,
    })) || [];
  return (
    <Card className="my-5">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle className={`${anek.className}`}>Protein Chart</CardTitle>
          <GraphMenu month={data.month} />
        </div>
        <CardDescription className={`${acme.className}`}>
          {getMonthName(data.month)}
        </CardDescription>
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
            />
            <YAxis domain={[0]} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="totalCalories"
              name="Calories"
              fill="rgb(251 146 60)"
              radius={8}
            >
              <LabelList
                position={"center"}
                angle={270}
                offset={0}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none"></div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <div className="m-5 text-center">
                <h2 className="my-2">Min Calories</h2>
                <Badge className="bg-purple-900 text-white">
                  {getMin(
                    data.data.map((x: any) =>
                      x.totalCalories ? x.totalCalories : 0
                    )
                  )}
                </Badge>
              </div>
              <div className="m-5 text-center">
                <h2 className="my-2">Average Calories</h2>
                <Badge className="bg-purple-900 text-white">
                  {getAverage(
                    data.data.map((x: any) =>
                      x.totalCalories ? x.totalCalories : 0
                    )
                  )}
                </Badge>
              </div>
              <div className="m-5 text-center">
                <h2 className="my-2">Max Calories</h2>
                <Badge className="bg-purple-900 text-white">
                  {getMax(
                    data.data.map((x: any) =>
                      x.totalCalories ? x.totalCalories : 0
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
}

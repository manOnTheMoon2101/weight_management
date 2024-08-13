"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSWR from "swr";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
export function CalorieGraph(date: any) {
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
      createdAt: new Date(item.createdAt).toLocaleDateString(), // Format date as needed
      totalCalories: item.totalCalories,
    })) || [];
  if (error) return <div>failed to load</div>;
  if (isLoading)
    return <div className="flex items-center space-x-4">loading</div>;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calorie Chart</CardTitle>
        <CardDescription> {months.map((x: any) => (x.value == date.month ? x.text : ""))}</CardDescription>
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="totalCalories" fill="rgb(251 146 60" radius={8}>
              <LabelList
                position="top"
                offset={5}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

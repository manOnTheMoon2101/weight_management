"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart"

const chartData = [
  { month: "January", desktop: 0 },
  { month: "February", desktop: 0 },
  { month: "March", desktop: 0 },
  { month: "April", desktop: 0},
  { month: "May", desktop: 0 },
  { month: "June", desktop:  0},
  { month: "July", desktop: 97 },
  { month: "August", desktop: 95 },
  { month: "September", desktop: 89 },
  { month: "October", desktop: 0},
  { month: "November", desktop: 0 },
  { month: "December", desktop: 0 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function AverageWeight() {
  return (
    <Card className="my-5 w-1/4">
      <CardHeader className="items-center pb-4">
        <CardTitle>Average Weight</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="purple"
              
              fillOpacity={0.6}
              
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

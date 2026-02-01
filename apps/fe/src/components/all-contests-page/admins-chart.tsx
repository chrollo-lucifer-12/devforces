"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { type PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@repo/ui/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";

export const description = "An interactive pie chart";

const desktopData = [
  { month: "alice", desktop: 186, fill: "var(--color-alice)" },
  { month: "bob", desktop: 305, fill: "var(--color-bob)" },
  { month: "charlie", desktop: 237, fill: "var(--color-charlie)" },
  { month: "diana", desktop: 173, fill: "var(--color-diana)" },
  { month: "evan", desktop: 209, fill: "var(--color-evan)" },
];

const userAvatars = {
  alice: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  bob: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  charlie: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
  diana: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
  evan: "https://api.dicebear.com/7.x/avataaars/svg?seed=Evan",
};

const chartConfig = {
  contests: {
    label: "Contests",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  alice: {
    label: "Alice",
    color: "var(--chart-1)",
  },
  bob: {
    label: "Bob",
    color: "var(--chart-2)",
  },
  charlie: {
    label: "Charlie",
    color: "var(--chart-3)",
  },
  diana: {
    label: "Diana",
    color: "var(--chart-4)",
  },
  evan: {
    label: "Evan",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

function AdminsChart() {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0]?.month);

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth],
  );
  const months = React.useMemo(() => desktopData.map((item) => item.month), []);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];
              const avatarUrl = userAvatars[key as keyof typeof userAvatars];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <img
                      src={avatarUrl || "/placeholder.svg"}
                      alt={config?.label}
                      className="h-5 w-5 rounded-full"
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const avatarUrl =
                      userAvatars[activeMonth as keyof typeof userAvatars];
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex]?.desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Contests
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default AdminsChart;

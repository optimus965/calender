import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

type ChartData = {
  method: string;
  count: number;
};

const data: ChartData[] = [
  { method: "LinkedIn Post", count: 12 },
  { method: "LinkedIn Message", count: 8 },
  { method: "Email", count: 15 },
  { method: "Phone Call", count: 5 },
  { method: "Other", count: 3 },
];

const config = {
  data: {
    theme: {
      light: "#2563eb",
      dark: "#3b82f6",
    },
  },
};

export function CommunicationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication Methods Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={config}>
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey="method" />
              <YAxis />
              <Bar dataKey="count" fill="var(--color-data)" />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
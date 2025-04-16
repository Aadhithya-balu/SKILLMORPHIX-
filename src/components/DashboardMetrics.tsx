
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Jan", value: 5 },
  { name: "Feb", value: 8 },
  { name: "Mar", value: 12 },
  { name: "Apr", value: 9 },
  { name: "May", value: 16 },
  { name: "Jun", value: 18 },
  { name: "Jul", value: 22 },
];

const DashboardMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Data Processing Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Month
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].payload.name}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Processing Jobs
                            </span>
                            <span className="font-bold text-forge-600">
                              {payload[0].payload.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMetrics;

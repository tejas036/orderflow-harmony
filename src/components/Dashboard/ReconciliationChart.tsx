
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReconciliationTrend } from "@/types";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";

interface ReconciliationChartProps {
  data: ReconciliationTrend[];
}

const ReconciliationChart = ({ data }: ReconciliationChartProps) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Reconciliation Trend (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="matched"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                name="Matched"
              />
              <Area
                type="monotone"
                dataKey="unmatched"
                stackId="1"
                stroke="#f97316"
                fill="#f97316"
                name="Unmatched"
              />
              <Area
                type="monotone"
                dataKey="exceptions"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                name="Exceptions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReconciliationChart;

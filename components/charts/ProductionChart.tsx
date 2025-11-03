'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductionData } from '@/lib/api/production';

interface ProductionChartProps {
  data: ProductionData[];
}

export function ProductionChart({ data }: ProductionChartProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Alberta Oil and Gas Production</CardTitle>
            <CardDescription>Historical production trends</CardDescription>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Oil</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Gas</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short' });
              }}
            />
            <YAxis 
              yAxisId="left"
              className="text-xs"
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              className="text-xs"
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              formatter={(value: number, name: string) => {
                if (name === 'Oil Production') {
                  return [`${(value / 1000).toFixed(0)}k bbl/d`, name];
                }
                return [`${value.toFixed(0)} MMcf/d`, name];
              }}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                });
              }}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="oil" 
              stroke="#22c55e" 
              strokeWidth={2}
              name="Oil Production"
              dot={false}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="gas" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Gas Production"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
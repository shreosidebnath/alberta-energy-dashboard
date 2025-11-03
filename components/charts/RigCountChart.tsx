'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RigCountChartProps {
  data: Array<{ date: string; count: number }>;
}

export function RigCountChart({ data }: RigCountChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alberta Drilling Rig Count</CardTitle>
        <CardDescription>12-month drilling activity trend</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short' });
              }}
            />
            <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                }}
                formatter={(value: number) => [`${value} rigs`, 'Active Rigs']}
                labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                    });
                }}
                />
            <Legend />
            <Bar 
              dataKey="count" 
              fill="hsl(var(--primary))" 
              name="Active Rigs"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface BasinChartProps {
  data: Array<{ basin: string; oil: number; gas: number }>;
}

export function BasinChart({ data }: BasinChartProps) {
  const chartData = data.map(item => ({
    basin: item.basin.replace(' Oil Sands', ''),
    oil: item.oil,
    gas: item.gas
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Production by Basin</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Current oil and gas production across major Alberta basins
        </CardDescription>
        <div className="flex gap-3 text-xs mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span className="text-muted-foreground">Oil</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-500" />
            <span className="text-muted-foreground">Gas</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 md:px-6">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <ResponsiveContainer width="100%" height={500}>
              <BarChart 
                data={chartData} 
                layout="vertical"
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis 
                  type="number"
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  dataKey="basin"
                  type="category"
                  width={90}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'Oil') {
                      return [`${(value / 1000).toFixed(0)}k bbl/d`, name];
                    }
                    return [`${value.toFixed(0)} MMcf/d`, name];
                  }}
                />
                <Bar 
                  dataKey="oil" 
                  fill="#22c55e"
                  name="Oil"
                  radius={[0, 4, 4, 0]}
                />
                <Bar 
                  dataKey="gas" 
                  fill="#3b82f6"
                  name="Gas"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
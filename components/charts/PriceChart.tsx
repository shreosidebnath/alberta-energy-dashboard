'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OilPrice } from '@/types';

interface PriceChartProps {
  data: OilPrice[];
}

export function PriceChart({ data }: PriceChartProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering && data.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % data.length);
      }, 500); 

      return () => clearInterval(interval);
    }
  }, [isHovering, data.length]);

  const activeData = data[activeIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle>WTI vs WCS Crude Oil Prices</CardTitle>
        <CardDescription>
          30-day price trends and differential
          {!isHovering && activeData && (
            <span className="ml-4 text-sm font-semibold text-primary">
              {new Date(activeData.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}: WTI ${activeData.wti} | WCS ${activeData.wcs}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart 
            data={data}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                });
              }}
            />
            <Legend />
            
            {!isHovering && activeData && (
              <>
                <ReferenceDot
                  x={activeData.date}
                  y={activeData.wti}
                  r={6}
                  fill="hsl(var(--primary))"
                  stroke="white"
                  strokeWidth={2}
                />
                <ReferenceDot
                  x={activeData.date}
                  y={activeData.wcs}
                  r={6}
                  fill="hsl(var(--destructive))"
                  stroke="white"
                  strokeWidth={2}
                />
              </>
            )}
            
            <Line 
              type="monotone" 
              dataKey="wti" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="WTI (USD/bbl)"
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="wcs" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="WCS (USD/bbl)"
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="differential" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={1}
              strokeDasharray="5 5"
              name="Differential"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
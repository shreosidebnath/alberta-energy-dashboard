'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ProductionCardProps {
  title: string;
  value: number;
  change: number;
  unit: string;
  type: 'oil' | 'gas';
}

export function ProductionCard({ title, value, change, unit, type }: ProductionCardProps) {
  const isPositive = change >= 0;
  
  const formatValue = (val: number) => {
    if (type === 'oil') {
      return `${(val / 1000).toFixed(0)}k`;
    }
    return `${val.toFixed(0)}`;
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{formatValue(value)}</div>
        <p className="text-xs text-muted-foreground mt-1">{unit}</p>
        <Badge 
          variant={isPositive ? "default" : "destructive"} 
          className="mt-2"
        >
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </Badge>
      </CardContent>
    </Card>
  );
}
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceCardProps {
  title: string;
  price: number;
  change: number;
  description: string;
}

export function PriceCard({ title, price, change, description }: PriceCardProps) {
  const isPositive = change > 0;
  const isNeutral = change === 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {isNeutral ? (
          <Minus className="h-4 w-4 text-muted-foreground" />
        ) : isPositive ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${price.toFixed(2)}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        <Badge 
          variant={isNeutral ? "secondary" : isPositive ? "default" : "destructive"} 
          className="mt-2"
        >
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </Badge>
      </CardContent>
    </Card>
  );
}
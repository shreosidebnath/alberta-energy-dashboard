'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

interface RigCountCardProps {
  count: number;
  change: number;
}

export function RigCountCard({ count, change }: RigCountCardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Drilling Rigs</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground mt-1">Alberta total</p>
        <Badge 
          variant={isPositive ? "default" : "destructive"} 
          className="mt-2"
        >
          {isPositive ? '+' : ''}{change} from last week
        </Badge>
      </CardContent>
    </Card>
  );
}
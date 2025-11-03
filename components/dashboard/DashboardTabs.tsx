'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PriceChart } from '@/components/charts/PriceChart';
import { ProductionChart } from '@/components/charts/ProductionChart';
import { BasinChart } from '@/components/charts/BasinChart';
import { RigCountChart } from '@/components/charts/RigCountChart';
import { OilPrice } from '@/types';
import { ProductionData } from '@/lib/api/production';
import { TrendingUp, BarChart3, Map, Activity } from 'lucide-react';

interface DashboardTabsProps {
  defaultTab: string;
  priceData: OilPrice[];
  productionData: ProductionData[];
  basinData: Array<{ basin: string; oil: number; gas: number }>;
  rigCountHistory: Array<{ date: string; count: number }>;
}

export function DashboardTabs({
  defaultTab,
  priceData,
  productionData,
  basinData,
  rigCountHistory
}: DashboardTabsProps) {
  return (
    <Tabs defaultValue={defaultTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/50">
        <TabsTrigger 
          value="prices" 
          className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-md"
        >
          <TrendingUp className="h-4 w-4" />
          <span className="font-semibold">Prices</span>
        </TabsTrigger>
        <TabsTrigger 
          value="production"
          className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-md"
        >
          <BarChart3 className="h-4 w-4" />
          <span className="font-semibold">Production</span>
        </TabsTrigger>
        <TabsTrigger 
          value="basins"
          className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-md"
        >
          <Map className="h-4 w-4" />
          <span className="font-semibold">Basins</span>
        </TabsTrigger>
        <TabsTrigger 
          value="rigs"
          className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-md"
        >
          <Activity className="h-4 w-4" />
          <span className="font-semibold">Rig Count</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="prices" className="space-y-4 mt-6">
        <PriceChart data={priceData} />
      </TabsContent>
      
      <TabsContent value="production" className="space-y-4 mt-6">
        <ProductionChart data={productionData} />
      </TabsContent>
      
      <TabsContent value="basins" className="space-y-4 mt-6">
        <BasinChart data={basinData} />
      </TabsContent>
      
      <TabsContent value="rigs" className="space-y-4 mt-6">
        <RigCountChart data={rigCountHistory} />
      </TabsContent>
    </Tabs>
  );
}
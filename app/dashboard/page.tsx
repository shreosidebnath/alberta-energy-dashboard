'use client';

import { useEffect, useState } from 'react';
import { PriceCard } from '@/components/dashboard/PriceCard';
import { RigCountCard } from '@/components/dashboard/RigCountCard';
import { ProductionCard } from '@/components/dashboard/ProductionCard';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20 mb-2" />
        <Skeleton className="h-3 w-32 mb-2" />
        <Skeleton className="h-6 w-16" />
      </CardContent>
    </Card>
  );
}

export default function DashboardPage({ searchParams }: { searchParams: { tab?: string } }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/dashboard-data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const defaultTab = searchParams.tab || 'prices';

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Energy Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground mb-3">
            Loading real-time data...
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Energy Dashboard</h1>
        <p className="text-sm text-red-500">Failed to load data</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Energy Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground mb-3">
          Real-time tracking of Alberta oil and gas market
        </p>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <span>
            WTI: Real-time EIA data ({new Date(data.currentPrices.lastUpdated).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })})
          </span>
          <span>
            WCS: Calculated using historical differential
          </span>
          <span>
            Production: AER ST37 ({new Date(data.currentProduction.date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            })})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
        <PriceCard
          title="WTI Crude"
          price={data.currentPrices.wti.price}
          change={data.currentPrices.wti.change}
          description="West Texas Intermediate"
        />
        <PriceCard
          title="WCS Crude"
          price={data.currentPrices.wcs.price}
          change={data.currentPrices.wcs.change}
          description="Western Canadian Select"
        />
        <PriceCard
          title="Differential"
          price={data.currentPrices.differential.price}
          change={data.currentPrices.differential.change}
          description="WTI-WCS Spread"
        />
        <RigCountCard
          count={data.rigCount.count}
          change={data.rigCount.change}
        />
        <ProductionCard
          title="Oil Production"
          value={data.currentProduction.oil.current}
          change={data.currentProduction.oil.change}
          unit="barrels per day"
          type="oil"
        />
        <ProductionCard
          title="Gas Production"
          value={data.currentProduction.gas.current}
          change={data.currentProduction.gas.change}
          unit="MMcf per day"
          type="gas"
        />
      </div>

      <DashboardTabs
        defaultTab={defaultTab}
        priceData={data.priceData}
        productionData={data.productionData}
        basinData={data.basinData}
        rigCountHistory={data.rigCountHistory}
      />
    </div>
  );
}
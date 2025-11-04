'use client';

import { useSearchParams } from 'next/navigation';
import { PriceCard } from './PriceCard';
import { RigCountCard } from './RigCountCard';
import { ProductionCard } from './ProductionCard';
import { DashboardTabs } from './DashboardTabs';
import { OilPrice } from '@/types';
import { ProductionData } from '@/lib/api/production';

interface DashboardClientProps {
  priceData: OilPrice[];
  currentPrices: any;
  rigCount: any;
  rigCountHistory: Array<{ date: string; count: number }>;
  productionData: ProductionData[];
  basinData: Array<{ basin: string; oil: number; gas: number }>;
  currentProduction: any;
}

export function DashboardClient({
  priceData,
  currentPrices,
  rigCount,
  rigCountHistory,
  productionData,
  basinData,
  currentProduction
}: DashboardClientProps) {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'prices';

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Energy Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground mb-3">
          Real-time tracking of Alberta oil and gas market
        </p>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <span>
            WTI: Real-time EIA data ({new Date(currentPrices.lastUpdated).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })})
          </span>
          <span>
            WCS: Calculated using historical differential
          </span>
          <span>
            Production: AER ST37 ({new Date(currentProduction.date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            })})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
        <PriceCard
          title="WTI Crude"
          price={currentPrices.wti.price}
          change={currentPrices.wti.change}
          description="West Texas Intermediate"
        />
        <PriceCard
          title="WCS Crude"
          price={currentPrices.wcs.price}
          change={currentPrices.wcs.change}
          description="Western Canadian Select"
        />
        <PriceCard
          title="Differential"
          price={currentPrices.differential.price}
          change={currentPrices.differential.change}
          description="WTI-WCS Spread"
        />
        <RigCountCard
          count={rigCount.count}
          change={rigCount.change}
        />
        <ProductionCard
          title="Oil Production"
          value={currentProduction.oil.current}
          change={currentProduction.oil.change}
          unit="barrels per day"
          type="oil"
        />
        <ProductionCard
          title="Gas Production"
          value={currentProduction.gas.current}
          change={currentProduction.gas.change}
          unit="MMcf per day"
          type="gas"
        />
      </div>

      <DashboardTabs
        defaultTab={defaultTab}
        priceData={priceData}
        productionData={productionData}
        basinData={basinData}
        rigCountHistory={rigCountHistory}
      />
    </div>
  );
}
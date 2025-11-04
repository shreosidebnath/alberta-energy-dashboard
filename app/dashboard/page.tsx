import { PriceCard } from '@/components/dashboard/PriceCard';
import { RigCountCard } from '@/components/dashboard/RigCountCard';
import { ProductionCard } from '@/components/dashboard/ProductionCard';
import { getRealPriceData, getRealCurrentPrices } from '@/lib/api/real-prices';
import { getAlbertaRigCount, getRigCountHistory } from '@/lib/api/rig-count';
import { getAlbertaProduction, getProductionByBasin, getCurrentProduction } from '@/lib/api/production';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export const revalidate = 86400;

export default async function DashboardPage() {
  const [priceData, currentPrices, rigCount, rigCountHistory, productionData, basinData, currentProduction] = await Promise.all([
    getRealPriceData(),
    getRealCurrentPrices(),
    getAlbertaRigCount(),
    getRigCountHistory(),
    getAlbertaProduction(),
    getProductionByBasin(),
    getCurrentProduction()
  ]);

  return (
    <DashboardClient
      priceData={priceData}
      currentPrices={currentPrices}
      rigCount={rigCount}
      rigCountHistory={rigCountHistory}
      productionData={productionData}
      basinData={basinData}
      currentProduction={currentProduction}
    />
  );
}
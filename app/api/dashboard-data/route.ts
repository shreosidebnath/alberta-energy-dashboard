import { NextResponse } from 'next/server';
import { getRealPriceData, getRealCurrentPrices } from '@/lib/api/real-prices';
import { getAlbertaRigCount, getRigCountHistory } from '@/lib/api/rig-count';
import { getAlbertaProduction, getProductionByBasin, getCurrentProduction } from '@/lib/api/production';

export const maxDuration = 30;
export const revalidate = 3600;

export async function GET() {
  try {
    const [
      priceData,
      currentPrices,
      rigCount,
      rigCountHistory,
      productionData,
      basinData,
      currentProduction
    ] = await Promise.all([
      getRealPriceData(),
      getRealCurrentPrices(),
      getAlbertaRigCount(),
      getRigCountHistory(),
      getAlbertaProduction(),
      getProductionByBasin(),
      getCurrentProduction()
    ]);

    return NextResponse.json({
      priceData,
      currentPrices,
      rigCount,
      rigCountHistory,
      productionData,
      basinData,
      currentProduction
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
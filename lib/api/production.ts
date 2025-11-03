import { AER_PRODUCTION_DATA } from '@/lib/data/aer-official';

export interface ProductionData {
  date: string;
  oil: number;
  gas: number;
  region: string;
}

export async function getAlbertaProduction(): Promise<ProductionData[]> {
  return AER_PRODUCTION_DATA.historical.map(item => ({
    date: item.date,
    oil: item.oil,
    gas: item.gas,
    region: 'Alberta'
  }));
}

export async function getProductionByBasin(): Promise<Array<{ basin: string; oil: number; gas: number }>> {
  return AER_PRODUCTION_DATA.byBasin;
}

export async function getCurrentProduction() {
  const data = AER_PRODUCTION_DATA.historical;
  const latest = data[data.length - 1];
  const previous = data[data.length - 2];
  
  return {
    oil: {
      current: latest.oil,
      change: ((latest.oil - previous.oil) / previous.oil) * 100
    },
    gas: {
      current: latest.gas,
      change: ((latest.gas - previous.gas) / previous.gas) * 100
    },
    date: AER_PRODUCTION_DATA.lastUpdated,
    source: AER_PRODUCTION_DATA.source
  };
}
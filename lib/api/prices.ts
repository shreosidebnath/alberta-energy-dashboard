import { OilPrice } from '@/types';

export async function getPriceData(): Promise<OilPrice[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const today = new Date();
  const data: OilPrice[] = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const wti = 70 + Math.sin(i / 3) * 5 + Math.random() * 3;
    const wcs = wti - (12 + Math.random() * 4);
    
    data.push({
      date: date.toISOString().split('T')[0],
      wti: Number(wti.toFixed(2)),
      wcs: Number(wcs.toFixed(2)),
      differential: Number((wti - wcs).toFixed(2))
    });
  }
  
  return data;
}

export async function getCurrentPrices() {
  const data = await getPriceData();
  const latest = data[data.length - 1];
  const previous = data[data.length - 2];
  
  return {
    wti: {
      price: latest.wti,
      change: ((latest.wti - previous.wti) / previous.wti) * 100
    },
    wcs: {
      price: latest.wcs,
      change: ((latest.wcs - previous.wcs) / previous.wcs) * 100
    },
    differential: {
      price: latest.differential,
      change: ((latest.differential - previous.differential) / previous.differential) * 100
    },
    lastUpdated: latest.date 
  };
}
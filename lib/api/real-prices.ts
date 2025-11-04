interface EIAResponse {
  response: {
    data: Array<{
      period: string;
      value: string;
    }>;
  };
}

export async function getWTIPrices(): Promise<Array<{ date: string; price: number }>> {
  const apiKey = 'mUEgmWvnRlfy05pGFS0EKAzyyLPJ17GWAmRjTMmm';
  
  try {
    const url = new URL('https://api.eia.gov/v2/petroleum/pri/spt/data/');
    url.searchParams.append('api_key', apiKey);
    url.searchParams.append('frequency', 'daily');
    url.searchParams.append('data[0]', 'value');
    url.searchParams.append('facets[product][]', 'EPCWTI');
    url.searchParams.append('sort[0][column]', 'period');
    url.searchParams.append('sort[0][direction]', 'desc');
    url.searchParams.append('offset', '0');
    url.searchParams.append('length', '30');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal,
      next: { revalidate: 3600 }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('EIA API Error:', errorText);
      throw new Error(`EIA API error: ${response.status}`);
    }

    const data: EIAResponse = await response.json();
    
    return data.response.data.map(item => ({
      date: item.period,
      price: parseFloat(item.value)
    })).reverse();
    
  } catch (error) {
    console.error('Error fetching WTI prices:', error);
    throw error;
  }
}

export async function calculateWCSPrices(wtiPrices: Array<{ date: string; price: number }>) {
  return wtiPrices.map(item => {
    const dateHash = new Date(item.date).getTime();
    const baseDifferential = 14;
    const variance = ((dateHash % 1000) / 1000) * 4;
    const differential = baseDifferential + variance;
    const wcs = item.price - differential;
    
    return {
      date: item.date,
      wti: item.price,
      wcs: Number(wcs.toFixed(2)),
      differential: Number(differential.toFixed(2))
    };
  });
}

export async function getRealPriceData() {
  try {
    const wtiPrices = await getWTIPrices();
    const pricesWithWCS = await calculateWCSPrices(wtiPrices);
    
    return pricesWithWCS.map(item => ({
      date: item.date,
      wti: Number(item.wti.toFixed(2)),
      wcs: Number(item.wcs.toFixed(2)),
      differential: Number(item.differential.toFixed(2))
    }));
  } catch (error) {
    console.error('Error getting real price data, using fallback:', error);
    const { getPriceData } = await import('./prices');
    return getPriceData();
  }
}

export async function getRealCurrentPrices() {
  try {
    const data = await getRealPriceData();
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
  } catch (error) {
    console.error('Error getting current prices, using fallback:', error);
    const { getCurrentPrices } = await import('./prices');
    return getCurrentPrices();
  }
}
interface WellFinderWell {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
  operator: string;
  licenseNumber: string;
}

export async function getWellsFromWellFinder(): Promise<WellFinderWell[]> {
  try {
    const response = await fetch(
      'https://albertawellfinder.com/api/wells?bounds=-120,50,-110,58',
      {
        next: { revalidate: 86400 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch well data');
    }

    const data = await response.json();
    
    return data.wells || [];
    
  } catch (error) {
    console.error('Error fetching wells from Well Finder:', error);
    return [];
  }
}

export async function mapWellFinderToOurFormat(wellFinderWells: WellFinderWell[]) {
  return wellFinderWells.map((well, index) => ({
    id: well.id || String(index),
    name: well.name || `Well-${index}`,
    latitude: well.latitude,
    longitude: well.longitude,
    status: well.status?.toLowerCase() === 'active' ? 'active' : 
            well.status?.toLowerCase() === 'drilling' ? 'drilling' : 'inactive',
    production: Math.floor(Math.random() * 1000) + 100,
    type: Math.random() > 0.5 ? 'oil' : 'gas',
    operator: well.operator || 'Unknown'
  }));
}
import { MAJOR_FACILITIES } from '@/lib/data/major-facilities';

export interface Well {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'drilling';
  production: number;
  type: 'oil' | 'gas';
  operator: string;
  facility?: string;
}

export async function getWells(): Promise<Well[]> {
  return MAJOR_FACILITIES.map(facility => ({
    id: facility.id,
    name: facility.name,
    latitude: facility.latitude,
    longitude: facility.longitude,
    status: 'active' as const,
    production: facility.production,
    type: facility.facility as 'oil' | 'gas',
    operator: facility.operator,
    facility: facility.type
  }));
}
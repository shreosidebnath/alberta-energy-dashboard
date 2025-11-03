export interface OilPrice {
  date: string;
  wti: number;
  wcs: number;
  differential: number;
}

export interface ProductionData {
  date: string;
  oil: number;
  gas: number;
  region: string;
}

export interface RigCount {
  date: string;
  drilling: number;
  total: number;
  region: string;
}

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

export type Basin = 'montney' | 'duvernay' | 'cardium' | 'viking' | 'all';

export interface DashboardMetrics {
  totalProduction: number;
  activeWells: number;
  rigCount: number;
  averagePrice: number;
}
export interface Branch {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  openedAt: string;
  active: boolean;
}

export interface StateData {
  uf: string;
  name: string;
  region: Region;
  population: number;
  gdpPerCapita: number;
  averageIncome: number;
  marketPotentialScore: number;
  estimatedDemand: number;
  isExpansionZone: boolean;
  branchCount: number;
}

export interface Competitor {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  brand: string;
}

export interface MarketPotential {
  uf: string;
  name: string;
  region: Region;
  score: number;
  gdpPerCapita: number;
  population: number;
  averageIncome: number;
}

export interface DemandData {
  uf: string;
  name: string;
  region: Region;
  estimatedDemand: number;
}

export interface ExpansionZone {
  uf: string;
  name: string;
  region: Region;
  score: number;
  estimatedDemand: number;
  branchCount: number;
}

export interface MarketOverview {
  totalStates: number;
  statesWithBranches: number;
  expansionZones: number;
  avgMarketPotential: number;
  totalEstimatedDemand: number;
  byRegion: RegionSummary[];
}

export interface RegionSummary {
  region: string;
  states: number;
  avgScore: number;
  totalDemand: number;
}

export type Region = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';

export type LayerId = 'branches' | 'marketPotential' | 'estimatedDemand' | 'expansionZones' | 'competitors';

export interface Layer {
  id: LayerId;
  label: string;
  description: string;
  color: string;
  enabled: boolean;
}

export interface FilterState {
  region: Region | 'all';
  period: '12months' | 'all';
  search: string;
}

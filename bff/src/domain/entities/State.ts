export interface State {
  uf: string;
  name: string;
  region: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';
  population: number;
  gdpPerCapita: number; // R$ per year
  averageIncome: number;
  marketPotentialScore: number; // 0-100
  estimatedDemand: number; // units
  isExpansionZone: boolean;
  branchCount: number;
}

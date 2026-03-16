export interface State {
  uf: string;
  name: string;
  region: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';
  population: number;
  gdpPerCapita: number;
  averageIncome: number;
  marketPotentialScore: number;
  estimatedDemand: number;
  isExpansionZone: boolean;
  branchCount: number;
}

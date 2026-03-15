import axios from 'axios';
import type { Branch, StateData, Competitor, MarketPotential, DemandData, ExpansionZone, MarketOverview } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 10000,
});

export const branchService = {
  getAll: (params?: { state?: string; since?: string }) =>
    api.get<{ data: Branch[]; total: number }>('/branches', { params }).then(r => r.data),
  getById: (id: string) =>
    api.get<{ data: Branch }>(`/branches/${id}`).then(r => r.data),
};

export const stateService = {
  getAll: (params?: { region?: string }) =>
    api.get<{ data: StateData[]; total: number }>('/states', { params }).then(r => r.data),
  getByUf: (uf: string) =>
    api.get<{ data: StateData }>(`/states/${uf}`).then(r => r.data),
};

export const competitorService = {
  getAll: (params?: { state?: string }) =>
    api.get<{ data: Competitor[]; total: number }>('/competitors', { params }).then(r => r.data),
};

export const marketService = {
  getPotential: (params?: { region?: string }) =>
    api.get<{ data: MarketPotential[]; total: number }>('/market/potential', { params }).then(r => r.data),
  getDemand: (params?: { region?: string }) =>
    api.get<{ data: DemandData[]; total: number }>('/market/demand', { params }).then(r => r.data),
  getExpansionZones: (params?: { region?: string }) =>
    api.get<{ data: ExpansionZone[]; total: number }>('/market/expansion-zones', { params }).then(r => r.data),
  getOverview: () =>
    api.get<{ data: MarketOverview }>('/market/overview').then(r => r.data),
};

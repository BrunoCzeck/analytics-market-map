import React, { createContext, useContext, useState } from 'react';
import type { FilterState, Region } from '../types';

interface FilterContextType {
  filters: FilterState;
  setRegion: (region: Region | 'all') => void;
  setPeriod: (period: FilterState['period']) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  region: 'all',
  period: 'all',
  search: '',
};

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const setRegion = (region: Region | 'all') => setFilters(prev => ({ ...prev, region }));
  const setPeriod = (period: FilterState['period']) => setFilters(prev => ({ ...prev, period }));
  const setSearch = (search: string) => setFilters(prev => ({ ...prev, search }));
  const resetFilters = () => setFilters(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setRegion, setPeriod, setSearch, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within FilterProvider');
  return ctx;
}

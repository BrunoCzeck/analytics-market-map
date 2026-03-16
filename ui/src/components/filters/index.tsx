import React from 'react';
import { useFilters } from '../../contexts/filter-context';
import type { Region } from '../../types';

const REGIONS: Array<{ value: Region | 'all'; label: string }> = [
  { value: 'all', label: 'Todas as Regiões' },
  { value: 'Norte', label: 'Norte' },
  { value: 'Nordeste', label: 'Nordeste' },
  { value: 'Centro-Oeste', label: 'Centro-Oeste' },
  { value: 'Sudeste', label: 'Sudeste' },
  { value: 'Sul', label: 'Sul' },
];

const selectStyle: React.CSSProperties = {
  background: 'rgba(15,23,42,0.95)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '8px',
  color: '#f1f5f9',
  padding: '8px 12px',
  fontSize: '13px',
  cursor: 'pointer',
  outline: 'none',
};

const inputStyle: React.CSSProperties = {
  ...selectStyle,
  width: '220px',
};

export function FilterBar() {
  const { filters, setRegion, setPeriod, setSearch } = useFilters();

  return (
    <div
      style={{
        position: 'absolute',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        background: 'rgba(15,23,42,0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '10px 16px',
        alignItems: 'center',
      }}
    >
      <input
        type="text"
        placeholder="Buscar estado ou cidade..."
        value={filters.search}
        onChange={e => setSearch(e.target.value)}
        style={inputStyle}
      />

      <select
        value={filters.region}
        onChange={e => setRegion(e.target.value as Region | 'all')}
        style={selectStyle}
      >
        {REGIONS.map(r => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>

      <select
        value={filters.period}
        onChange={e => setPeriod(e.target.value as 'all' | '12months')}
        style={selectStyle}
      >
        <option value="all">Histórico Completo</option>
        <option value="12months">Últimos 12 Meses</option>
      </select>
    </div>
  );
}

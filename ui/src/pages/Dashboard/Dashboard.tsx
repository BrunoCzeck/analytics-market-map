import React, { useState, useEffect } from 'react';
import { BrazilMap } from '../../components/Map/BrazilMap';
import { LayerPanel } from '../../components/LayerPanel/LayerPanel';
import { FilterBar } from '../../components/Filters/FilterBar';
import { RegionPanel } from '../../components/RegionPanel/RegionPanel';
import { MapLegend } from '../../components/Map/MapLegend';
import { StatsBar } from '../../components/Map/StatsBar';
import { useFilters } from '../../contexts/FilterContext';
import { useMapData, useStateDetail } from '../../hooks/useMapData';
import { marketService } from '../../services/api';
import type { MarketOverview } from '../../types';

export function Dashboard() {
  const { filters } = useFilters();
  const { branches, competitors, marketPotential, demandData, expansionZones, loading, error } = useMapData(filters);
  const [selectedUf, setSelectedUf] = useState<string | null>(null);
  const { state: selectedState } = useStateDetail(selectedUf);
  const [overview, setOverview] = useState<MarketOverview | null>(null);
  const [overviewLoading, setOverviewLoading] = useState(true);

  useEffect(() => {
    marketService.getOverview()
      .then(r => setOverview(r.data))
      .catch(console.error)
      .finally(() => setOverviewLoading(false));
  }, []);

  const filteredBranches = filters.search
    ? branches.filter(b =>
        b.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        b.city.toLowerCase().includes(filters.search.toLowerCase()) ||
        b.state.toLowerCase().includes(filters.search.toLowerCase())
      )
    : branches;

  const filteredCompetitors = filters.search
    ? competitors.filter(c =>
        c.city.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.state.toLowerCase().includes(filters.search.toLowerCase())
      )
    : competitors;

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#0f172a' }}>
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '56px',
          background: 'rgba(15,23,42,0.98)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          zIndex: 1001,
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: 'white' }}>D</div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', lineHeight: 1 }}>Driva</div>
            <div style={{ fontSize: '10px', color: '#64748b', lineHeight: 1 }}>Market Intelligence</div>
          </div>
        </div>

        <FilterBar />

        {loading && (
          <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#64748b' }}>Carregando dados...</div>
        )}
        {error && (
          <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#ef4444' }}>Erro ao carregar: {error}</div>
        )}
      </div>

      {/* Map Area */}
      <div style={{ position: 'absolute', top: '56px', left: 0, right: 0, bottom: 0 }}>
        <BrazilMap
          branches={filteredBranches}
          competitors={filteredCompetitors}
          marketPotential={filters.region !== 'all' ? marketPotential.filter(s => s.region === filters.region) : marketPotential}
          demandData={filters.region !== 'all' ? demandData.filter(s => s.region === filters.region) : demandData}
          expansionZones={filters.region !== 'all' ? expansionZones.filter(s => s.region === filters.region) : expansionZones}
          onStateSelect={setSelectedUf}
        />
        <LayerPanel />
        <MapLegend />
        <StatsBar overview={overview} loading={overviewLoading} />
        {selectedState && (
          <RegionPanel
            state={selectedState}
            allPotential={marketPotential}
            onClose={() => setSelectedUf(null)}
          />
        )}
      </div>
    </div>
  );
}

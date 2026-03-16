import React from 'react';
import type { MarketOverview } from '../../types';

interface StatsBarProps {
  overview: MarketOverview | null;
  loading: boolean;
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '0 16px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>{value}</div>
      <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{label}</div>
    </div>
  );
}

export function StatsBar({ overview, loading }: StatsBarProps) {
  if (loading || !overview) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(15,23,42,0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '12px 20px',
        display: 'flex',
        gap: '0',
        alignItems: 'center',
      }}
    >
      <StatItem label="Estados com Filiais" value={`${overview.statesWithBranches}/27`} />
      <StatItem label="Zonas de Expansão" value={String(overview.expansionZones)} />
      <StatItem label="Potencial Médio" value={`${overview.avgMarketPotential}/100`} />
      <div style={{ textAlign: 'center', padding: '0 16px' }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#f59e0b' }}>
          {(overview.totalEstimatedDemand / 1_000_000).toFixed(1)}M
        </div>
        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Demanda Total</div>
      </div>
    </div>
  );
}

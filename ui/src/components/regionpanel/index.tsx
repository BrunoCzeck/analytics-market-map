import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { StateData, MarketPotential } from '../../types';

interface RegionPanelProps {
  state: StateData | null;
  allPotential: MarketPotential[];
  onClose: () => void;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px' }}>
      <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>{value}</div>
    </div>
  );
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function formatCurrency(n: number): string {
  return `R$ ${n.toLocaleString('pt-BR')}`;
}

export function RegionPanel({ state, allPotential, onClose }: RegionPanelProps) {
  if (!state) return null;

  const topStates = [...allPotential]
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(s => ({ name: s.uf, score: s.score, highlight: s.uf === state.uf }));

  const scoreColor = state.marketPotentialScore >= 70 ? '#22c55e' : state.marketPotentialScore >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div
      style={{
        position: 'absolute',
        top: '80px',
        right: '16px',
        bottom: '16px',
        zIndex: 1000,
        background: 'rgba(15,23,42,0.97)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        width: '300px',
        overflowY: 'auto',
        padding: '20px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#f1f5f9' }}>{state.name}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>{state.region} · {state.uf}</div>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '18px' }}
        >
          ✕
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
        <div style={{ fontSize: '36px', fontWeight: 800, color: scoreColor }}>{state.marketPotentialScore}</div>
        <div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Score de Potencial</div>
          <div style={{ fontSize: '12px', color: scoreColor, fontWeight: 600 }}>
            {state.marketPotentialScore >= 70 ? 'Alto Potencial' : state.marketPotentialScore >= 40 ? 'Potencial Médio' : 'Baixo Potencial'}
          </div>
          {state.isExpansionZone && (
            <div style={{ fontSize: '11px', color: '#8b5cf6', fontWeight: 600, marginTop: '2px' }}>
              ● Zona de Expansão
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
        <MetricCard label="População" value={formatNumber(state.population)} />
        <MetricCard label="PIB per Capita" value={formatCurrency(state.gdpPerCapita)} />
        <MetricCard label="Renda Média" value={formatCurrency(state.averageIncome)} />
        <MetricCard label="Demanda Est." value={formatNumber(state.estimatedDemand)} />
        <MetricCard label="Filiais Próprias" value={String(state.branchCount)} />
      </div>

      <div style={{ marginBottom: '8px', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Top 8 Estados por Potencial
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={topStates} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
          <Tooltip
            contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f1f5f9', fontSize: '12px' }}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {topStates.map((entry, index) => (
              <Cell key={index} fill={entry.highlight ? '#3b82f6' : '#334155'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

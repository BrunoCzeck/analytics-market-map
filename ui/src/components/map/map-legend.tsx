import React from 'react';
import { useLayers } from '../../contexts/layer-context';

export function MapLegend() {
  const { layers } = useLayers();
  const enabled = layers.filter(l => l.enabled);
  if (enabled.length === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '32px',
        left: '16px',
        zIndex: 1000,
        background: 'rgba(15,23,42,0.9)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '10px 14px',
      }}
    >
      <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legenda</div>
      {enabled.map(l => (
        <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: l.color, flexShrink: 0 }} />
          <span style={{ fontSize: '11px', color: '#cbd5e1' }}>{l.label}</span>
        </div>
      ))}
      {layers.find(l => l.id === 'marketPotential' && l.enabled) && (
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>Potencial</div>
          {[
            { color: '#22c55e', label: 'Alto (80+)' },
            { color: '#84cc16', label: 'Bom (60-79)' },
            { color: '#f59e0b', label: 'Médio (40-59)' },
            { color: '#ef4444', label: 'Baixo (<40)' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color }} />
              <span style={{ fontSize: '10px', color: '#94a3b8' }}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

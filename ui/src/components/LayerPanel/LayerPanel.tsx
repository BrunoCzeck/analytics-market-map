import React from 'react';
import { useLayers } from '../../contexts/LayerContext';
import type { Layer } from '../../types';

function LayerToggle({ layer, onToggle }: { layer: Layer; onToggle: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        borderRadius: '8px',
        background: layer.enabled ? 'rgba(255,255,255,0.05)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.2s',
        marginBottom: '4px',
      }}
      onClick={onToggle}
    >
      <div
        style={{
          width: '36px',
          height: '20px',
          borderRadius: '10px',
          background: layer.enabled ? layer.color : '#475569',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: layer.enabled ? '18px' : '2px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'white',
            transition: 'left 0.2s',
          }}
        />
      </div>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>{layer.label}</div>
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{layer.description}</div>
      </div>
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: layer.enabled ? layer.color : '#475569',
          marginLeft: 'auto',
          flexShrink: 0,
        }}
      />
    </div>
  );
}

export function LayerPanel() {
  const { layers, toggleLayer } = useLayers();

  return (
    <div
      style={{
        position: 'absolute',
        top: '80px',
        left: '16px',
        zIndex: 1000,
        background: 'rgba(15,23,42,0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '16px',
        width: '220px',
      }}
    >
      <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
        Camadas de Dados
      </div>
      {layers.map(layer => (
        <LayerToggle
          key={layer.id}
          layer={layer}
          onToggle={() => toggleLayer(layer.id)}
        />
      ))}
    </div>
  );
}

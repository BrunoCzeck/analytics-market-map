import React, { createContext, useContext, useState } from 'react';
import type { Layer, LayerId } from '../types';

const defaultLayers: Layer[] = [
  { id: 'branches', label: 'Filiais Ativas', description: 'Lojas em operação', color: '#22c55e', enabled: true },
  { id: 'marketPotential', label: 'Potencial de Mercado', description: 'Heatmap por intensidade', color: '#3b82f6', enabled: true },
  { id: 'estimatedDemand', label: 'Demanda Estimada', description: 'Bolhas proporcionais', color: '#f59e0b', enabled: false },
  { id: 'expansionZones', label: 'Zonas de Expansão', description: 'Áreas prioritárias', color: '#8b5cf6', enabled: false },
  { id: 'competitors', label: 'Concorrência', description: 'Concorrentes conhecidos', color: '#ef4444', enabled: false },
];

interface LayerContextType {
  layers: Layer[];
  toggleLayer: (id: LayerId) => void;
  isEnabled: (id: LayerId) => boolean;
}

const LayerContext = createContext<LayerContextType | null>(null);

export function LayerProvider({ children }: { children: React.ReactNode }) {
  const [layers, setLayers] = useState<Layer[]>(defaultLayers);

  const toggleLayer = (id: LayerId) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l));
  };

  const isEnabled = (id: LayerId) => layers.find(l => l.id === id)?.enabled ?? false;

  return (
    <LayerContext.Provider value={{ layers, toggleLayer, isEnabled }}>
      {children}
    </LayerContext.Provider>
  );
}

export function useLayers() {
  const ctx = useContext(LayerContext);
  if (!ctx) throw new Error('useLayers must be used within LayerProvider');
  return ctx;
}

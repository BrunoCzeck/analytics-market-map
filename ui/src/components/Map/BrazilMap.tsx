import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLayers } from '../../contexts/LayerContext';
import type { Branch, Competitor, MarketPotential, DemandData, ExpansionZone } from '../../types';

// Approximate centroids for Brazilian states
const STATE_CENTROIDS: Record<string, [number, number]> = {
  AC: [-9.0238, -70.812],
  AL: [-9.5713, -36.782],
  AP: [1.4102, -51.770],
  AM: [-3.4168, -65.856],
  BA: [-12.9718, -38.501],
  CE: [-5.4984, -39.321],
  DF: [-15.7801, -47.930],
  ES: [-19.1834, -40.308],
  GO: [-15.8270, -49.836],
  MA: [-5.4220, -45.440],
  MT: [-12.6819, -56.921],
  MS: [-20.7722, -54.785],
  MG: [-18.5122, -44.555],
  PA: [-3.4168, -52.291],
  PB: [-7.2399, -36.782],
  PR: [-24.7822, -51.985],
  PE: [-8.8137, -36.954],
  PI: [-7.7183, -42.729],
  RJ: [-22.9068, -43.173],
  RN: [-5.8127, -36.205],
  RS: [-30.0346, -53.218],
  RO: [-10.8322, -63.034],
  RR: [1.9900, -61.330],
  SC: [-27.2423, -50.218],
  SP: [-22.9519, -46.984],
  SE: [-10.5741, -37.385],
  TO: [-10.1753, -48.298],
};

function scoreToColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#84cc16';
  if (score >= 40) return '#f59e0b';
  if (score >= 20) return '#f97316';
  return '#ef4444';
}

interface BrazilMapProps {
  branches: Branch[];
  competitors: Competitor[];
  marketPotential: MarketPotential[];
  demandData: DemandData[];
  expansionZones: ExpansionZone[];
  onStateSelect: (uf: string) => void;
}

export function BrazilMap({ branches, competitors, marketPotential, demandData, expansionZones, onStateSelect }: BrazilMapProps) {
  const { isEnabled } = useLayers();

  const maxDemand = Math.max(...demandData.map(d => d.estimatedDemand), 1);

  return (
    <MapContainer
      center={[-14.235, -51.925]}
      zoom={4}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      {isEnabled('marketPotential') && marketPotential.map(s => {
        const pos = STATE_CENTROIDS[s.uf];
        if (!pos) return null;
        return (
          <CircleMarker
            key={`mp-${s.uf}`}
            center={pos}
            radius={Math.max(20, Math.min(50, s.population / 500000))}
            pathOptions={{
              fillColor: scoreToColor(s.score),
              fillOpacity: 0.35,
              color: scoreToColor(s.score),
              weight: 1,
              opacity: 0.6,
            }}
            eventHandlers={{ click: () => onStateSelect(s.uf) }}
          >
            <Tooltip permanent={false} direction="top">
              <strong>{s.name} ({s.uf})</strong><br />
              Potencial: {s.score}/100
            </Tooltip>
          </CircleMarker>
        );
      })}

      {isEnabled('estimatedDemand') && demandData.map(s => {
        const pos = STATE_CENTROIDS[s.uf];
        if (!pos) return null;
        const radius = Math.max(8, (s.estimatedDemand / maxDemand) * 40);
        return (
          <CircleMarker
            key={`ed-${s.uf}`}
            center={[pos[0] + 0.3, pos[1] + 0.3]}
            radius={radius}
            pathOptions={{
              fillColor: '#f59e0b',
              fillOpacity: 0.5,
              color: '#f59e0b',
              weight: 1.5,
              opacity: 0.8,
            }}
            eventHandlers={{ click: () => onStateSelect(s.uf) }}
          >
            <Tooltip direction="top">
              <strong>{s.name}</strong><br />
              Demanda: {s.estimatedDemand.toLocaleString('pt-BR')}
            </Tooltip>
          </CircleMarker>
        );
      })}

      {isEnabled('expansionZones') && expansionZones.map(s => {
        const pos = STATE_CENTROIDS[s.uf];
        if (!pos) return null;
        return (
          <CircleMarker
            key={`ez-${s.uf}`}
            center={pos}
            radius={28}
            pathOptions={{
              fillColor: '#8b5cf6',
              fillOpacity: 0.25,
              color: '#8b5cf6',
              weight: 2,
              opacity: 0.9,
              dashArray: '6 4',
            }}
            eventHandlers={{ click: () => onStateSelect(s.uf) }}
          >
            <Tooltip direction="top">
              <strong>Zona de Expansão: {s.name}</strong><br />
              Score: {s.score} · Demanda: {s.estimatedDemand.toLocaleString('pt-BR')}
            </Tooltip>
          </CircleMarker>
        );
      })}

      {isEnabled('branches') && branches.map(b => {
        return (
          <CircleMarker
            key={`b-${b.id}`}
            center={[b.lat, b.lng]}
            radius={8}
            pathOptions={{
              fillColor: '#22c55e',
              fillOpacity: 0.9,
              color: '#15803d',
              weight: 2,
              opacity: 1,
            }}
          >
            <Popup>
              <div style={{ minWidth: '160px' }}>
                <strong>{b.name}</strong><br />
                {b.city}, {b.state}<br />
                Abertura: {new Date(b.openedAt).toLocaleDateString('pt-BR')}
              </div>
            </Popup>
            <Tooltip direction="top">{b.name}</Tooltip>
          </CircleMarker>
        );
      })}

      {isEnabled('competitors') && competitors.map(c => {
        return (
          <CircleMarker
            key={`c-${c.id}`}
            center={[c.lat, c.lng]}
            radius={7}
            pathOptions={{
              fillColor: '#ef4444',
              fillOpacity: 0.85,
              color: '#b91c1c',
              weight: 2,
              opacity: 1,
            }}
          >
            <Popup>
              <div style={{ minWidth: '140px' }}>
                <strong>{c.brand}</strong><br />
                {c.name}<br />
                {c.city}, {c.state}
              </div>
            </Popup>
            <Tooltip direction="top">{c.brand} - {c.city}</Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

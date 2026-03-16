import { useState, useEffect } from 'react';
import { branchService, competitorService, marketService, stateService } from '../services/api';
import type { Branch, Competitor, MarketPotential, DemandData, ExpansionZone, StateData } from '../types';
import type { FilterState } from '../types';

export function useMapData(filters: FilterState) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [marketPotential, setMarketPotential] = useState<MarketPotential[]>([]);
  const [demandData, setDemandData] = useState<DemandData[]>([]);
  const [expansionZones, setExpansionZones] = useState<ExpansionZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const regionParam = filters.region !== 'all' ? filters.region : undefined;
        const sinceParam = filters.period === '12months'
          ? new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
          : undefined;

        const [b, c, mp, dd, ez] = await Promise.all([
          branchService.getAll({ since: sinceParam }),
          competitorService.getAll(),
          marketService.getPotential({ region: regionParam }),
          marketService.getDemand({ region: regionParam }),
          marketService.getExpansionZones({ region: regionParam }),
        ]);

        setBranches(b.data);
        setCompetitors(c.data);
        setMarketPotential(mp.data);
        setDemandData(dd.data);
        setExpansionZones(ez.data);
      } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [filters.region, filters.period]);

  return { branches, competitors, marketPotential, demandData, expansionZones, loading, error };
}

export function useStateDetail(uf: string | null) {
  const [state, setState] = useState<StateData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uf) { setState(null); return; }
    setLoading(true);
    stateService.getByUf(uf)
      .then(r => setState(r.data))
      .catch(() => setState(null))
      .finally(() => setLoading(false));
  }, [uf]);

  return { state, loading };
}

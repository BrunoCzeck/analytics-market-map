import { FastifyInstance } from 'fastify';
import { InMemoryStateRepository } from '../../../infrastructure/repositories/InMemoryStateRepository';

export async function marketRoutes(fastify: FastifyInstance) {
  const repo = new InMemoryStateRepository();

  fastify.get('/market/potential', async (request, reply) => {
    const { region } = request.query as { region?: string };
    const states = region
      ? await repo.findByRegion(region)
      : await repo.findAll();
    const data = states.map(s => ({
      uf: s.uf,
      name: s.name,
      region: s.region,
      score: s.marketPotentialScore,
      gdpPerCapita: s.gdpPerCapita,
      population: s.population,
      averageIncome: s.averageIncome,
    }));
    return reply.send({ data, total: data.length });
  });

  fastify.get('/market/demand', async (request, reply) => {
    const { region } = request.query as { region?: string };
    const states = region
      ? await repo.findByRegion(region)
      : await repo.findAll();
    const data = states.map(s => ({
      uf: s.uf,
      name: s.name,
      region: s.region,
      estimatedDemand: s.estimatedDemand,
    }));
    return reply.send({ data, total: data.length });
  });

  fastify.get('/market/expansion-zones', async (request, reply) => {
    const { region } = request.query as { region?: string };
    const states = region
      ? await repo.findByRegion(region)
      : await repo.findAll();
    const data = states
      .filter(s => s.isExpansionZone)
      .map(s => ({
        uf: s.uf,
        name: s.name,
        region: s.region,
        score: s.marketPotentialScore,
        estimatedDemand: s.estimatedDemand,
        branchCount: s.branchCount,
      }));
    return reply.send({ data, total: data.length });
  });

  fastify.get('/market/overview', async (_request, reply) => {
    const states = await repo.findAll();
    const overview = {
      totalStates: states.length,
      statesWithBranches: states.filter(s => s.branchCount > 0).length,
      expansionZones: states.filter(s => s.isExpansionZone).length,
      avgMarketPotential: Math.round(states.reduce((acc, s) => acc + s.marketPotentialScore, 0) / states.length),
      totalEstimatedDemand: states.reduce((acc, s) => acc + s.estimatedDemand, 0),
      byRegion: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'].map(region => ({
        region,
        states: states.filter(s => s.region === region).length,
        avgScore: Math.round(
          states.filter(s => s.region === region).reduce((acc, s) => acc + s.marketPotentialScore, 0) /
          Math.max(states.filter(s => s.region === region).length, 1)
        ),
        totalDemand: states.filter(s => s.region === region).reduce((acc, s) => acc + s.estimatedDemand, 0),
      })),
    };
    return reply.send({ data: overview });
  });
}

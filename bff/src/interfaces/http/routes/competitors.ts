import { FastifyInstance } from 'fastify';
import { InMemoryCompetitorRepository } from '../../../infrastructure/repositories/InMemoryCompetitorRepository';
import { GetCompetitors } from '../../../application/use-cases/GetCompetitors';

export async function competitorRoutes(fastify: FastifyInstance) {
  const repo = new InMemoryCompetitorRepository();
  const getCompetitors = new GetCompetitors(repo);

  fastify.get('/competitors', async (request, reply) => {
    const { state } = request.query as { state?: string };
    const competitors = await getCompetitors.execute({ state });
    return reply.send({ data: competitors, total: competitors.length });
  });
}

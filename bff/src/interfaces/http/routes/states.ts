import { FastifyInstance } from 'fastify';
import { InMemoryStateRepository } from '../../../infrastructure/repositories/InMemoryStateRepository';
import { GetStates } from '../../../application/use-cases/GetStates';

export async function stateRoutes(fastify: FastifyInstance) {
  const repo = new InMemoryStateRepository();
  const getStates = new GetStates(repo);

  fastify.get('/states', async (request, reply) => {
    const { region } = request.query as { region?: string };
    const states = await getStates.execute({ region });
    const arr = Array.isArray(states) ? states : [states];
    return reply.send({ data: arr, total: arr.length });
  });

  fastify.get('/states/:uf', async (request, reply) => {
    const { uf } = request.params as { uf: string };
    const state = await repo.findByUf(uf.toUpperCase());
    if (!state) return reply.status(404).send({ error: 'State not found' });
    return reply.send({ data: state });
  });
}

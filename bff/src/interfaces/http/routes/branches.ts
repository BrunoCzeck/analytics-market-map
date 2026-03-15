import { FastifyInstance } from 'fastify';
import { InMemoryBranchRepository } from '../../../infrastructure/repositories/InMemoryBranchRepository';
import { GetBranches } from '../../../application/use-cases/GetBranches';

export async function branchRoutes(fastify: FastifyInstance) {
  const repo = new InMemoryBranchRepository();
  const getBranches = new GetBranches(repo);

  fastify.get('/branches', async (request, reply) => {
    const { state, since } = request.query as { state?: string; since?: string };
    const branches = await getBranches.execute({ state, since });
    return reply.send({ data: branches, total: branches.length });
  });

  fastify.get('/branches/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const branch = await repo.findById(id);
    if (!branch) return reply.status(404).send({ error: 'Branch not found' });
    return reply.send({ data: branch });
  });
}

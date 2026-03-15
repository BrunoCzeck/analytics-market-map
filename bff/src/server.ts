import Fastify from 'fastify';
import cors from '@fastify/cors';
import { branchRoutes } from './interfaces/http/routes/branches';
import { stateRoutes } from './interfaces/http/routes/states';
import { competitorRoutes } from './interfaces/http/routes/competitors';
import { marketRoutes } from './interfaces/http/routes/market';

const fastify = Fastify({ logger: true });

async function bootstrap() {
  await fastify.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  fastify.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  await fastify.register(branchRoutes, { prefix: '/api/v1' });
  await fastify.register(stateRoutes, { prefix: '/api/v1' });
  await fastify.register(competitorRoutes, { prefix: '/api/v1' });
  await fastify.register(marketRoutes, { prefix: '/api/v1' });

  const port = Number(process.env.PORT) || 3001;
  const host = process.env.HOST || '0.0.0.0';

  await fastify.listen({ port, host });
  console.log(`BFF running on http://${host}:${port}`);
}

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});

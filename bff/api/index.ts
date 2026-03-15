import type { IncomingMessage, ServerResponse } from 'http';
import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { branchRoutes } from '../src/interfaces/http/routes/branches';
import { stateRoutes } from '../src/interfaces/http/routes/states';
import { competitorRoutes } from '../src/interfaces/http/routes/competitors';
import { marketRoutes } from '../src/interfaces/http/routes/market';

let app: FastifyInstance | null = null;

async function getApp(): Promise<FastifyInstance> {
  if (app) return app;

  app = Fastify({ logger: false });

  await app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  await app.register(branchRoutes, { prefix: '/api/v1' });
  await app.register(stateRoutes, { prefix: '/api/v1' });
  await app.register(competitorRoutes, { prefix: '/api/v1' });
  await app.register(marketRoutes, { prefix: '/api/v1' });

  await app.ready();
  return app;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const fastify = await getApp();
  fastify.server.emit('request', req, res);
}

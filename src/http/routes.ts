import { type FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register.controller';
import { authenticate } from '@/http/controllers/authenticate';

export const appRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/users', register);
  app.post('/sessions', authenticate);
};

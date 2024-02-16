import { type FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register.controller';
import { authenticate } from '@/http/controllers/authenticate';
import { profile } from '@/http/controllers/profile';

export const appRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.get('/me', profile);
};

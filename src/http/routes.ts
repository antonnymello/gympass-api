import { type FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register.controller';

export const appRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post('/users', register);
};

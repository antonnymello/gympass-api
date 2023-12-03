import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { registerUseCase } from '@/use-cases/register';

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    await registerUseCase({ name, email, password });
    return reply.status(201).send();
  } catch (error) {
    return reply.status(409).send();
  }
};

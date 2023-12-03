import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { RegisterUseCase } from '@/use-cases/register';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

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
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    await registerUseCase.execute({ name, email, password });
    return reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send();
    }

    return reply.status(500).send();
  }
};

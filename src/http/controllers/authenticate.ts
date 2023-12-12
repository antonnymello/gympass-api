import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { AuthenticateUseCase } from '@/use-cases/authenticate';

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    await authenticateUseCase.execute({ email, password });

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
};

import { type User } from '@/@types/fastify-jwt';
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';
import { type FastifyRequest, type FastifyReply } from 'fastify';

export const profile = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  await request.jwtVerify();

  const getUserProfile = makeGetUserProfileUseCase();

  const user = request.user as User;

  const profile = await getUserProfile.execute({ userId: user.sub });

  return reply
    .status(200)
    .send({ user: { ...profile, password_has: undefined } });
};

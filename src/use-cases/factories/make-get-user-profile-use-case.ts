import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile';

export const makeGetUserProfileUseCase = (): GetUserProfileUseCase => {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
};

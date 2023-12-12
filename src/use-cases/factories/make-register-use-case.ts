import { PrismaUsersRepository } from '@/repositories/prisma/prisma-user-repository';
import { RegisterUseCase } from '@/use-cases/register';

export const makeRegisterUseCase = (): RegisterUseCase => {
  const prismaUsersRepository = new PrismaUsersRepository();
  return new RegisterUseCase(prismaUsersRepository);
};

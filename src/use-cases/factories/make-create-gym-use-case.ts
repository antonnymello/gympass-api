import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { CreateGymUseCase } from '@/use-cases/create-gym';

export const makeCreateGymUseCase = (): CreateGymUseCase => {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
};

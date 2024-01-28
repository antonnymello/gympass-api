import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { FindGymsUseCase } from '@/use-cases/find-gyms';

export const makeFindGymsUseCase = (): FindGymsUseCase => {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FindGymsUseCase(gymsRepository);

  return useCase;
};

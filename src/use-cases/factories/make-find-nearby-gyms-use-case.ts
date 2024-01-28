import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { FindNearbyGymsUseCase } from '@/use-cases/find-nearby-gyms';

export const makeFindNearbyGymsUseCase = (): FindNearbyGymsUseCase => {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FindNearbyGymsUseCase(gymsRepository);

  return useCase;
};

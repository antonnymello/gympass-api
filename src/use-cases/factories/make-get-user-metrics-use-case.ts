import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics';

export const makeGetUserMetricsUseCase = (): GetUserMetricsUseCase => {
  const checkInRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInRepository);

  return useCase;
};

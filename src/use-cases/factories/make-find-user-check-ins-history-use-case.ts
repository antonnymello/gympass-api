import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { FindUserCheckInsHistoryUseCase } from '@/use-cases/find-user-check-ins-history';

export const makeFindUserCheckInsHistoryUseCase =
  (): FindUserCheckInsHistoryUseCase => {
    const checkInRepository = new PrismaCheckInsRepository();
    const useCase = new FindUserCheckInsHistoryUseCase(checkInRepository);

    return useCase;
  };

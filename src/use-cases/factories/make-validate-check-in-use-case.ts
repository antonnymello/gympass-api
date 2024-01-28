import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in';

export const makeValidateCheckInUseCase = (): ValidateCheckInUseCase => {
  const checkInRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInRepository);

  return useCase;
};

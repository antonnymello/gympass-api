import { type CheckIn } from '@prisma/client';
import { type CheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

interface FindUserCheckInsHistoryUseCaseRequest {
  userId: string;
}

interface FindUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FindUserCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: FindUserCheckInsHistoryUseCaseRequest): Promise<FindUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId);

    return { checkIns };
  }
}

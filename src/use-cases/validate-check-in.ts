import { type CheckIn } from '@prisma/client';
import { type CheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface ValidateCheckInUseCaseRequest {
  userId: string;
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}

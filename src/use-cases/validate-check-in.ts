import { type CheckIn } from '@prisma/client';
import { type CheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error';

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

    const timeDifferenceInMilliseconds =
      new Date().getTime() - checkIn.created_at.getTime();

    const distanceInMinutesFromCheckInCreation = Math.floor(
      timeDifferenceInMilliseconds / 60000
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}

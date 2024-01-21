import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

describe('Validate Check-in Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let sut: ValidateCheckInUseCase;

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    // vi.useFakeTimers();
  });

  afterEach(() => {
    // vi.useRealTimers();
  });

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      id_user: 'any_user_id',
      id_gym: 'any_gym_id',
    });

    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toBeInstanceOf(Date);
    expect(checkInsRepository.items[0]).toEqual(checkIn);
  });

  it('should not be able to validate inexistent check-in', async () => {
    const promise = sut.execute({
      userId: 'any_user_id',
      checkInId: 'any_check_in_id',
    });

    await expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});

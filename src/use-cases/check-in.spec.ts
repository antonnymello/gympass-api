import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/check-in';

describe('Authenticate Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let sut: CheckInUseCase;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/check-in';

describe('Authenticate Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let sut: CheckInUseCase;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 11, 15, 12, 0, 0));

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    });

    const promise = sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    });

    await expect(promise).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in in different day', async () => {
    vi.setSystemTime(new Date(2023, 11, 15, 12, 0, 0));

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    });

    vi.setSystemTime(new Date(2023, 11, 16, 12, 0, 0));

    const promise = sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    });

    await expect(promise).resolves.toBeTruthy();
  });
});

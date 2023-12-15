import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

describe('Authenticate Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let gymsRepository: InMemoryGymsRepository;
  let sut: CheckInUseCase;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'any_gym_id',
      title: 'any_gym_title',
      phone: 'any_gym_phone',
      description: 'any_gym_description',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 11, 15, 12, 0, 0));

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: 0,
      userLongitude: 0,
    });

    const promise = sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(promise).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in in different day', async () => {
    vi.setSystemTime(new Date(2023, 11, 15, 12, 0, 0));

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2023, 11, 16, 12, 0, 0));

    const promise = sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(promise).resolves.toBeTruthy();
  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'any_gym_id_2',
      title: 'any_gym_title',
      phone: 'any_gym_phone',
      description: 'any_gym_description',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    });

    const promise = sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id_2',
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(promise).rejects.toBeInstanceOf(Error);
  });
});

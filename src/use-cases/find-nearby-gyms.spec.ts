import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FindNearbyGymsUseCase } from '@/use-cases/find-nearby-gyms';

describe('Find Nearby Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: FindNearbyGymsUseCase;

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FindNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to find nearby gyms', async () => {
    await gymsRepository.create({
      title: 'any_near_gym_title',
      description: 'any_description',
      phone: 'any_phone',
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    await gymsRepository.create({
      title: 'any_far_gym_title',
      description: 'any_description',
      phone: 'any_phone',
      latitude: -21.0610928,
      longitude: -49.5229501,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms[0].title).toBe('any_near_gym_title');
  });
});

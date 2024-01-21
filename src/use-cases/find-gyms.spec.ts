import { describe, it, expect, beforeEach } from 'vitest';
import { FindGymsUseCase } from '@/use-cases/find-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

describe('Find Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: FindGymsUseCase;

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FindGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'any_title',
      description: 'any_description',
      phone: 'any_phone',
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    await gymsRepository.create({
      title: 'other_title',
      description: 'any_description',
      phone: 'any_phone',
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    const { gyms } = await sut.execute({ query: 'any_title', page: 1 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'any_title' })]);
  });

  it('should be able to find paginated gyms search', async () => {
    for (let i = 0; i < 22; i++) {
      await gymsRepository.create({
        title: `any_title_${i}`,
        description: 'any_description',
        phone: 'any_phone',
        latitude: -27.0747279,
        longitude: -49.4889672,
      });
    }

    const { gyms } = await sut.execute({ query: 'any_title', page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'any_title_20' }),
      expect.objectContaining({ title: 'any_title_21' }),
    ]);
  });
});

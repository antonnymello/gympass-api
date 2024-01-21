import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from '@/use-cases/create-gym';

describe('Register Use Case', () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: CreateGymUseCase;

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'any_title',
      description: 'any_description',
      phone: 'any_phone',
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});

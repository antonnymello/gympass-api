import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics';

describe('Get User Metrics Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let sut: GetUserMetricsUseCase;

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      id_user: 'any_user_id',
      id_gym: 'any_gym_id',
    });

    await checkInsRepository.create({
      id_user: 'any_user_id',
      id_gym: 'other_gym_id',
    });

    const { checkInsCount } = await sut.execute({ userId: 'any_user_id' });

    expect(checkInsCount).toBe(2);
  });
});

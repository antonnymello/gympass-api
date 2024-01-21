import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { FindUserCheckInsHistoryUseCase } from '@/use-cases/find-user-check-ins-history';

describe('Find User Check-ins History Use Case', () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let sut: FindUserCheckInsHistoryUseCase;

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FindUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it('should be able to find  check-in history', async () => {
    await checkInsRepository.create({
      id_user: 'any_user_id',
      id_gym: 'any_gym_id',
    });

    await checkInsRepository.create({
      id_user: 'any_user_id',
      id_gym: 'other_gym_id',
    });

    const { checkIns } = await sut.execute({ userId: 'any_user_id', page: 1 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ id_gym: 'any_gym_id' }),
      expect.objectContaining({ id_gym: 'other_gym_id' }),
    ]);
  });

  it('should be able to find paginated check-in history', async () => {
    for (let i = 0; i < 22; i++) {
      await checkInsRepository.create({
        id_user: 'any_user_id',
        id_gym: `any_gym_id_${i}`,
      });
    }

    const { checkIns } = await sut.execute({ userId: 'any_user_id', page: 2 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ id_gym: 'any_gym_id_20' }),
      expect.objectContaining({ id_gym: 'any_gym_id_21' }),
    ]);
  });
});

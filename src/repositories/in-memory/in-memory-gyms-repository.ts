import { type GymsRepository } from '@/repositories/gyms-repository';
import { type Gym } from '@prisma/client';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    return this.items.find((gym) => gym.id === id) ?? null;
  }
}

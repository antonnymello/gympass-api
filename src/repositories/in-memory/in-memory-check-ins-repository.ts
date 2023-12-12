import { type CheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { type Prisma, type CheckIn } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      id_user: data.id_user,
      id_gym: data.id_gym,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}

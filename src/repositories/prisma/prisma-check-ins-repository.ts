import { prisma } from '@/lib/prisma';
import { type CheckInsRepository } from '@/repositories/check-ins-repository';
import { type CheckIn, type Prisma } from '@prisma/client';

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        id_user: userId,
        created_at: { gte: startOfDay, lte: endOfDay },
      },
    });

    return checkIn;
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({ where: { id } });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: { id_user: userId },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({ where: { id_user: userId } });

    return count;
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const updatedCheckIn = await prisma.checkIn.update({
      where: { id: data.id },
      data,
    });

    return updatedCheckIn;
  }
}

import { prisma } from '@/lib/prisma';
import { type UsersRepository } from '@/repositories/users-repository';
import { type User, type Prisma } from '@prisma/client';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}

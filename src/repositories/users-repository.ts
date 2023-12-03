import { type Prisma, type User } from '@prisma/client';

export interface UsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
}

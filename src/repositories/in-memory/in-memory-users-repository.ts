import { type UsersRepository } from '@/repositories/users-repository';
import { type User, type Prisma } from '@prisma/client';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      ...data,
      id: this.items.length.toString(),
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) ?? null;
  }
}

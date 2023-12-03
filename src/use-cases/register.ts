import { prisma } from '@/lib/prisma';
import { PrismaUsersRepository } from '@/repositories/prisma-user-repository';
import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export const registerUseCase = async ({
  name,
  email,
  password,
}: RegisterUseCaseRequest): Promise<void> => {
  const userAlreadyExists = await prisma.user.findUnique({ where: { email } });

  if (userAlreadyExists !== null) {
    throw new Error('Email already in use');
  }

  const passwordHash = await hash(password, 6);

  const prismaRepository = new PrismaUsersRepository();

  await prismaRepository.create({ name, email, password_hash: passwordHash });
};

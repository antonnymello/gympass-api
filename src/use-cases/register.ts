import { prisma } from '@/lib/prisma';
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

  await prisma.user.create({
    data: { name, email, password_hash: passwordHash },
  });
};

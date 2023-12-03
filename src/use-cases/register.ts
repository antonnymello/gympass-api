import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { type UsersRepository } from '@/repositories/users-repository';
import { type User } from '@prisma/client';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists !== null) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return { user };
  }
}

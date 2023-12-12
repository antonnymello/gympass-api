import { describe, it, expect } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(userRepository);

    await userRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password_hash: await hash('any_password', 6),
    });

    const { user } = await sut.execute({
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(userRepository);

    const promise = sut.execute({
      email: 'invalid_email@mail.com',
      password: 'any_password',
    });

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(userRepository);

    await userRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password_hash: await hash('any_password', 6),
      });

    const promise = sut.execute({
      email: 'any_email@mail.com',
      password: 'invalid_password',
    });

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});

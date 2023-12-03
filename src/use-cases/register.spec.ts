import { compare } from 'bcryptjs';
import { describe, it, expect } from 'vitest';
import { RegisterUseCase } from '@/use-cases/register';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(userRepository);

    const { user } = await sut.execute({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash the user's password before saving it to the database", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(userRepository);

    const { user } = await sut.execute({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password',
    });

    const isPasswordCorrectlyHashed = await compare(
      'any_password',
      user.password_hash
    );

    expect(user.password_hash).not.toBe('any_password');
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should throw an error if the user's email is already in use", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(userRepository);

    await userRepository.create({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password_hash: 'any_password_hash',
    });

    const promise = sut.execute({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password',
    });

    await expect(promise).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});

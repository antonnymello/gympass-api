import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

describe('Authenticate Use Case', () => {
  let userRepository: InMemoryUsersRepository;
  let sut: GetUserProfileUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password_hash: await hash('any_password', 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual('any_name');
  });

  it('should not be able to get user profile with invalid id', async () => {
    const promise = sut.execute({
      userId: 'invalid_id',
    });

    await expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});

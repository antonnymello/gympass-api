import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready();

    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: 'password',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ token: expect.any(String) });
  });
});

import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { type Environment } from 'vitest';

const generateDatabaseURL = (schema: string): string => {
  const databaseURL = process.env.DATABASE_URL;

  if (!databaseURL) {
    throw new Error('DATABASE_URL is not set');
  }

  const url = new URL(databaseURL);

  url.searchParams.set('schema', schema);

  return url.toString();
};

const prismaEnvironment: Environment = {
  name: 'prisma',
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync('npx prisma migrate deploy');

    return {
      async teardown() {
        console.log('Tearing down...');
      },
    };
  },
  transformMode: 'ssr',
};

export default prismaEnvironment;

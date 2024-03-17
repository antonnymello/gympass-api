import { type Environment } from 'vitest';

const prismaEnvironment: Environment = {
  name: 'prisma',
  async setup() {
    console.log('Running...');

    return {
      async teardown() {
        console.log('Tearing down...');
      },
    };
  },
  transformMode: 'ssr',
};

export default prismaEnvironment;

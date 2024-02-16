import '@fastify/jwt';

interface User {
  sub: string;
}

declare module 'fastify-jwt' {
  export interface FastifyJWT {
    user: User;
  }
}

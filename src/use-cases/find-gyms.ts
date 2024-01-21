import { type GymsRepository } from '@/repositories/gyms-repository';
import { type Gym } from '@prisma/client';

interface FindGymsUseCaseRequest {
  query: string;
  page: number;
}

interface FindGymsUseCaseResponse {
  gyms: Gym[];
}

export class FindGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: FindGymsUseCaseRequest): Promise<FindGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findMany(query, page);

    return { gyms };
  }
}

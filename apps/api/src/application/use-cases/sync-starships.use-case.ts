import { AxiosInstance } from 'axios';
import { Starship } from '../../domain/entities/starship.entity';
import { IStarshipRepository } from '../../infrastructure/repositories/starship.repository.interface';
import { SwapiResponse } from '../contracts/swapi-response.interface';
import { SwapiStarship } from '../contracts/swapi-starship.interface';

export class SyncStarshipsUseCase {
  constructor(
    private readonly repo: IStarshipRepository,
    private readonly http: AxiosInstance,
  ) {}

  async execute(): Promise<void> {
    let url: string | null = 'https://swapi.dev/api/starships/';
    while (url) {
      const { data }: { data: SwapiResponse<SwapiStarship> } =
        await this.http.get(url);
      const ships = data.results.map(
        (s) =>
          new Starship(
            crypto.randomUUID(),
            s.url,
            s.name,
            s.model,
            s.starship_class,
            s.manufacturer,
            s.cost_in_credits,
            s.length,
            s.crew,
            s.passengers,
            s.max_atmosphering_speed,
            s.hyperdrive_rating,
            s.MGLT,
            s.cargo_capacity,
            s.consumables,
          ),
      );
      await this.repo.upsertBatch(ships);
      url = data.next;
    }
  }
}

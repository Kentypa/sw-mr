import { AxiosInstance } from 'axios';
import { Planet } from '../../domain/entities/planet.entity';
import { IPlanetRepository } from '../../infrastructure/repositories/planet.repository.interface';
import { SwapiPlanet } from '../contracts/swapi-planet.interface';
import { SwapiResponse } from '../contracts/swapi-response.interface';

export class SyncPlanetsUseCase {
  constructor(
    private readonly repo: IPlanetRepository,
    private readonly http: AxiosInstance,
  ) {}

  async execute(): Promise<void> {
    let url: string | null = 'https://swapi.dev/api/planets/';
    while (url) {
      const { data }: { data: SwapiResponse<SwapiPlanet> } =
        await this.http.get(url);
      const planets = data.results.map(
        (p) =>
          new Planet(
            crypto.randomUUID(),
            p.url,
            p.name,
            p.diameter,
            p.rotation_period,
            p.orbital_period,
            p.gravity,
            p.population,
            p.climate,
            p.terrain,
            p.surface_water,
          ),
      );
      await this.repo.upsertBatch(planets);
      url = data.next;
    }
  }
}

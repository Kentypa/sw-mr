import { AxiosInstance } from 'axios';
import { Species } from '../../domain/entities/species.entity';
import { IPlanetRepository } from '../../infrastructure/repositories/planet.repository.interface';
import { ISpeciesRepository } from '../../infrastructure/repositories/species.repository.interface';
import { SwapiResponse } from '../contracts/swapi-response.interface';
import { SwapiSpecies } from '../contracts/swapi-species.interface';

export class SyncSpeciesUseCase {
  constructor(
    private readonly speciesRepo: ISpeciesRepository,
    private readonly planetRepo: IPlanetRepository,
    private readonly http: AxiosInstance,
  ) {}

  async execute(): Promise<void> {
    let url: string | null = 'https://swapi.dev/api/species/';
    while (url) {
      const { data }: { data: SwapiResponse<SwapiSpecies> } =
        await this.http.get(url);
      const batch: Species[] = [];
      for (const s of data.results) {
        const planet = s.homeworld
          ? await this.planetRepo.findBySwapiId(s.homeworld)
          : null;
        batch.push(
          new Species(
            crypto.randomUUID(),
            s.url,
            s.name,
            s.classification,
            s.designation,
            s.average_height,
            s.average_lifespan,
            s.eye_colors,
            s.hair_colors,
            s.skin_colors,
            s.language,
            planet,
          ),
        );
      }
      await this.speciesRepo.upsertBatch(batch);
      url = data.next;
    }
  }
}

import { AxiosInstance } from 'axios';
import { Character } from '../../domain/entities/character.entity';
import { Film } from '../../domain/entities/film.entity';
import { Planet } from '../../domain/entities/planet.entity';
import { Species } from '../../domain/entities/species.entity';
import { Starship } from '../../domain/entities/starship.entity';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { ICharacterRepository } from '../../infrastructure/repositories/character.repository.interface';
import { IFilmRepository } from '../../infrastructure/repositories/film.repository.interface';
import { IPlanetRepository } from '../../infrastructure/repositories/planet.repository.interface';
import { ISpeciesRepository } from '../../infrastructure/repositories/species.repository.interface';
import { IStarshipRepository } from '../../infrastructure/repositories/starship.repository.interface';
import { IVehicleRepository } from '../../infrastructure/repositories/vehicle.repository.interface';
import { SwapiFilm } from '../contracts/swapi-film.interface';
import { SwapiResponse } from '../contracts/swapi-response.interface';

export class SyncFilmsUseCase {
  constructor(
    private readonly repo: IFilmRepository,
    private readonly charRepo: ICharacterRepository,
    private readonly planetRepo: IPlanetRepository,
    private readonly speciesRepo: ISpeciesRepository,
    private readonly starshipRepo: IStarshipRepository,
    private readonly vehicleRepo: IVehicleRepository,
    private readonly http: AxiosInstance,
  ) {}

  async execute(): Promise<void> {
    let url: string | null = 'https://swapi.dev/api/films/';

    while (url) {
      const { data }: { data: SwapiResponse<SwapiFilm> } =
        await this.http.get(url);
      const films: Film[] = [];

      for (const f of data.results) {
        const chars = (
          await Promise.all(
            f.characters.map((u) => this.charRepo.findBySwapiId(u)),
          )
        ).filter(Boolean) as Character[];
        const planets = (
          await Promise.all(
            f.planets.map((u) => this.planetRepo.findBySwapiId(u)),
          )
        ).filter(Boolean) as Planet[];
        const starships = (
          await Promise.all(
            f.starships.map((u) => this.starshipRepo.findBySwapiId(u)),
          )
        ).filter(Boolean) as Starship[];
        const vehicles = (
          await Promise.all(
            f.vehicles.map((u) => this.vehicleRepo.findBySwapiId(u)),
          )
        ).filter(Boolean) as Vehicle[];
        const species = (
          await Promise.all(
            f.species.map((u) => this.speciesRepo.findBySwapiId(u)),
          )
        ).filter(Boolean) as Species[];

        films.push(
          new Film(
            crypto.randomUUID(),
            f.url,
            f.title,
            f.episode_id,
            f.opening_crawl,
            f.director,
            f.producer,
            f.release_date,
            chars,
            planets,
            starships,
            vehicles,
            species,
          ),
        );
      }

      await this.repo.upsertBatch(films);
      url = data.next;
    }
  }
}

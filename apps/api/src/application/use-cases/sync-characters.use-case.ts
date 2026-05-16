import { AxiosInstance } from 'axios';
import { Character } from '../../domain/entities/character.entity';
import { Species } from '../../domain/entities/species.entity';
import { Starship } from '../../domain/entities/starship.entity';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { ICharacterRepository } from '../../infrastructure/repositories/character.repository.interface';
import { IPlanetRepository } from '../../infrastructure/repositories/planet.repository.interface';
import { ISpeciesRepository } from '../../infrastructure/repositories/species.repository.interface';
import { IStarshipRepository } from '../../infrastructure/repositories/starship.repository.interface';
import { IVehicleRepository } from '../../infrastructure/repositories/vehicle.repository.interface';
import { SwapiPerson } from '../contracts/swapi-person.interface';
import { SwapiResponse } from '../contracts/swapi-response.interface';

export class SyncCharactersUseCase {
  constructor(
    private readonly charRepo: ICharacterRepository,
    private readonly planetRepo: IPlanetRepository,
    private readonly speciesRepo: ISpeciesRepository,
    private readonly starshipRepo: IStarshipRepository,
    private readonly vehicleRepo: IVehicleRepository,
    private readonly http: AxiosInstance,
  ) {}

  async execute(): Promise<void> {
    let url: string | null = 'https://swapi.dev/api/people/';
    while (url) {
      const { data }: { data: SwapiResponse<SwapiPerson> } =
        await this.http.get(url);
      const chars: Character[] = [];

      for (const p of data.results) {
        const planet = p.homeworld
          ? await this.planetRepo.findBySwapiId(p.homeworld)
          : null;
        const species = (
          await Promise.all(
            p.species.map((u) => this.speciesRepo.findBySwapiId(u)),
          )
        ).filter(Boolean) as Species[];
        const starships = (
          await Promise.all(
            p.starships.map((u) => this.starshipRepo.findBySwapiId(u)),
          )
        ).filter(Boolean) as Starship[];
        const vehicles = (
          await Promise.all(
            p.vehicles.map((u) => this.vehicleRepo.findBySwapiId(u)),
          )
        ).filter(Boolean) as Vehicle[];

        chars.push(
          new Character(
            crypto.randomUUID(),
            p.url,
            p.name,
            p.birth_year,
            p.eye_color,
            p.gender,
            p.hair_color,
            p.height,
            p.mass,
            p.skin_color,
            planet,
            species,
            starships,
            vehicles,
          ),
        );
      }
      await this.charRepo.upsertBatch(chars);
      url = data.next;
    }
  }
}

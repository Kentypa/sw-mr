import { SyncCharactersUseCase } from './sync-characters.use-case.js';
import { SyncFilmsUseCase } from './sync-films.use-case.js';
import { SyncPlanetsUseCase } from './sync-planet.use-case.js';
import { SyncSpeciesUseCase } from './sync-species.use-case.js';
import { SyncStarshipsUseCase } from './sync-starships.use-case.js';
import { SyncVehiclesUseCase } from './sync-vehicle.use-case.js';

export class SyncAllUseCase {
  constructor(
    private readonly syncPlanets: SyncPlanetsUseCase,
    private readonly syncSpecies: SyncSpeciesUseCase,
    private readonly syncVehicles: SyncVehiclesUseCase,
    private readonly syncStarships: SyncStarshipsUseCase,
    private readonly syncCharacters: SyncCharactersUseCase,
    private readonly syncFilms: SyncFilmsUseCase,
  ) {}

  async execute(): Promise<void> {
    await this.syncPlanets.execute();
    await this.syncSpecies.execute();
    await this.syncVehicles.execute();
    await this.syncStarships.execute();

    await this.syncCharacters.execute();
    await this.syncFilms.execute();
  }
}

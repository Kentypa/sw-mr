import { Module } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { SyncAllUseCase } from '../../application/use-cases/sync-all.use-case';
import { SyncCharactersUseCase } from '../../application/use-cases/sync-characters.use-case';
import { SyncFilmsUseCase } from '../../application/use-cases/sync-films.use-case';
import { SyncPlanetsUseCase } from '../../application/use-cases/sync-planet.use-case';
import { SyncSpeciesUseCase } from '../../application/use-cases/sync-species.use-case';
import { SyncStarshipsUseCase } from '../../application/use-cases/sync-starships.use-case';
import { SyncVehiclesUseCase } from '../../application/use-cases/sync-vehicle.use-case';
import { SyncController } from '../../presentation/sync.controller';
import { IPlanetRepository } from '../repositories/planet.repository.interface';
import { ISpeciesRepository } from '../repositories/species.repository.interface';
import { IStarshipRepository } from '../repositories/starship.repository.interface';
import { IVehicleRepository } from '../repositories/vehicle.repository.interface';
import { CharacterModule } from './character.module';
import { FilmModule } from './film.module';
import { PlanetModule } from './planet.module';
import { SpeciesModule } from './species.module';
import { StarshipModule } from './starship.module';
import { VehicleModule } from './vehicle.module';

@Module({
  imports: [
    FilmModule,
    PlanetModule,
    CharacterModule,
    StarshipModule,
    VehicleModule,
    SpeciesModule,
  ],
  controllers: [SyncController],
  providers: [
    {
      provide: 'AXIOS',
      useValue: axios.create({
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }),
    },
    {
      provide: SyncPlanetsUseCase,
      inject: ['IPlanetRepository', 'AXIOS'],
      useFactory: (repo: IPlanetRepository, http: AxiosInstance) =>
        new SyncPlanetsUseCase(repo, http),
    },
    {
      provide: SyncSpeciesUseCase,
      inject: ['ISpeciesRepository', 'IPlanetRepository', 'AXIOS'],
      useFactory: (
        repo: ISpeciesRepository,
        planet: IPlanetRepository,
        http: AxiosInstance,
      ) => new SyncSpeciesUseCase(repo, planet, http),
    },
    {
      provide: SyncVehiclesUseCase,
      inject: ['IVehicleRepository', 'AXIOS'],
      useFactory: (repo: IVehicleRepository, http: AxiosInstance) =>
        new SyncVehiclesUseCase(repo, http),
    },
    {
      provide: SyncStarshipsUseCase,
      inject: ['IStarshipRepository', 'AXIOS'],
      useFactory: (repo: IStarshipRepository, http: AxiosInstance) =>
        new SyncStarshipsUseCase(repo, http),
    },
    {
      provide: SyncCharactersUseCase,
      inject: [
        'ICharacterRepository',
        'IPlanetRepository',
        'ISpeciesRepository',
        'IStarshipRepository',
        'IVehicleRepository',
        'AXIOS',
      ],
      useFactory: (c: any, p: any, s: any, st: any, v: any, http: any) =>
        new SyncCharactersUseCase(c, p, s, st, v, http),
    },
    {
      provide: SyncFilmsUseCase,
      inject: [
        'IFilmRepository',
        'ICharacterRepository',
        'IPlanetRepository',
        'ISpeciesRepository',
        'IStarshipRepository',
        'IVehicleRepository',
        'AXIOS',
      ],
      useFactory: (
        f: any,
        c: any,
        p: any,
        s: any,
        st: any,
        v: any,
        http: any,
      ) => new SyncFilmsUseCase(f, c, p, s, st, v, http),
    },
    {
      provide: SyncAllUseCase,
      inject: [
        SyncPlanetsUseCase,
        SyncSpeciesUseCase,
        SyncVehiclesUseCase,
        SyncStarshipsUseCase,
        SyncCharactersUseCase,
        SyncFilmsUseCase,
      ],
      useFactory: (
        p: SyncPlanetsUseCase,
        s: SyncSpeciesUseCase,
        v: SyncVehiclesUseCase,
        st: SyncStarshipsUseCase,
        c: SyncCharactersUseCase,
        f: SyncFilmsUseCase,
      ) => new SyncAllUseCase(p, s, v, st, c, f),
    },
  ],
})
export class SyncModule {}

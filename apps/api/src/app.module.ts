import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module.js';
import { CharacterModule } from './infrastructure/modules/character.module.js';
import { FilmModule } from './infrastructure/modules/film.module.js';
import { ImageModule } from './infrastructure/modules/image.module.js';
import { PlanetModule } from './infrastructure/modules/planet.module.js';
import { SpeciesModule } from './infrastructure/modules/species.module.js';
import { StarshipModule } from './infrastructure/modules/starship.module.js';
import { SyncModule } from './infrastructure/modules/sync.module.js';
import { VehicleModule } from './infrastructure/modules/vehicle.module.js';

@Module({
  imports: [
    DatabaseModule,
    PlanetModule,
    CharacterModule,
    FilmModule,
    StarshipModule,
    VehicleModule,
    SpeciesModule,
    SyncModule,
    ImageModule,
  ],
})
export class AppModule {}

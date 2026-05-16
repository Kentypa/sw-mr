import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterOrmEntity } from '../entities/character.orm-entity';
import { FilmOrmEntity } from '../entities/film.orm-entity';
import { ImageOrmEntity } from '../entities/image.orm-entity';
import { PlanetOrmEntity } from '../entities/planet.orm-entity';
import { SpeciesOrmEntity } from '../entities/species.orm-entity';
import { StarshipOrmEntity } from '../entities/starship.orm-entity';
import { VehicleOrmEntity } from '../entities/vehicle.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'dev',
      password: process.env.DATABASE_PASSWORD || 'dev',
      database: process.env.DATABASE_NAME || 'starwars',
      entities: [
        CharacterOrmEntity,
        PlanetOrmEntity,
        FilmOrmEntity,
        StarshipOrmEntity,
        VehicleOrmEntity,
        SpeciesOrmEntity,
        ImageOrmEntity,
      ],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetUseCases } from '../../application/use-cases/planet.use-case.js';
import { PlanetController } from '../../presentation/controllers/planet.controller.js';
import { PlanetOrmEntity } from '../entities/planet.orm-entity.js';
import { PlanetRepository } from '../repositories/planet.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetOrmEntity])],
  controllers: [PlanetController],
  providers: [
    { provide: 'IPlanetRepository', useClass: PlanetRepository },
    {
      provide: PlanetUseCases,
      inject: ['IPlanetRepository'],
      useFactory: (repo) => new PlanetUseCases(repo),
    },
  ],
  exports: ['IPlanetRepository'],
})
export class PlanetModule {}

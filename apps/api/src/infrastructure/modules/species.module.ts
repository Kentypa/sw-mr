import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesUseCases } from '../../application/use-cases/species.use-case.js';
import { SpeciesController } from '../../presentation/controllers/species.controller.js';
import { SpeciesOrmEntity } from '../entities/species.orm-entity.js';
import { SpeciesRepository } from '../repositories/species.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesOrmEntity])],
  controllers: [SpeciesController],
  providers: [
    { provide: 'ISpeciesRepository', useClass: SpeciesRepository },
    {
      provide: SpeciesUseCases,
      inject: ['ISpeciesRepository'],
      useFactory: (repo) => new SpeciesUseCases(repo),
    },
  ],
  exports: ['ISpeciesRepository'],
})
export class SpeciesModule {}

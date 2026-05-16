import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipUseCases } from '../../application/use-cases/starship.use-case.js';
import { StarshipController } from '../../presentation/controllers/starship.controller.js';
import { StarshipOrmEntity } from '../entities/starship.orm-entity.js';
import { StarshipRepository } from '../repositories/starship.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([StarshipOrmEntity])],
  controllers: [StarshipController],
  providers: [
    { provide: 'IStarshipRepository', useClass: StarshipRepository },
    {
      provide: StarshipUseCases,
      inject: ['IStarshipRepository'],
      useFactory: (repo) => new StarshipUseCases(repo),
    },
  ],
  exports: ['IStarshipRepository'],
})
export class StarshipModule {}

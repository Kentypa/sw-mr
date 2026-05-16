import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmUseCases } from '../../application/use-cases/film.use-case.js';
import { FilmController } from '../../presentation/controllers/film.controller.js';
import { FilmOrmEntity } from '../entities/film.orm-entity.js';
import { FilmRepository } from '../repositories/film.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([FilmOrmEntity])],
  controllers: [FilmController],
  providers: [
    { provide: 'IFilmRepository', useClass: FilmRepository },
    {
      provide: FilmUseCases,
      inject: ['IFilmRepository'],
      useFactory: (repo) => new FilmUseCases(repo),
    },
  ],
  exports: ['IFilmRepository'],
})
export class FilmModule {}

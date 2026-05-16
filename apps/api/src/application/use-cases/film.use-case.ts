import { Injectable, NotFoundException } from '@nestjs/common';
import { Film } from '../../domain/entities/film.entity';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface';
import { IFilmRepository } from '../../infrastructure/repositories/film.repository.interface';
import { CreateFilmDto, UpdateFilmDto } from '../../presentation/dtos/film.dto';

@Injectable()
export class FilmUseCases {
  constructor(private readonly repo: IFilmRepository) {}

  async getAll(params: PaginationParams): Promise<Film[]> {
    return this.repo.findAll(params);
  }

  async getById(id: string): Promise<Film> {
    const film = await this.repo.findById(id);
    if (!film) throw new NotFoundException('Film not found');
    return film;
  }

  async create(dto: CreateFilmDto): Promise<Film> {
    const newFilm = new Film(
      crypto.randomUUID(),
      `custom-${Date.now()}`,
      dto.title,
      dto.episodeId,
      dto.openingCrawl,
      dto.director,
      dto.producer,
      dto.releaseDate,
      [],
      [],
      [],
      [],
      [],
    );
    return this.repo.create(newFilm);
  }

  async update(id: string, dto: UpdateFilmDto): Promise<Film> {
    await this.getById(id);
    return this.repo.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repo.delete(id);
  }
}

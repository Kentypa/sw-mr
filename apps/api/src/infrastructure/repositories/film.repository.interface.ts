import { Film } from '../../domain/entities/film.entity';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface';

export interface IFilmRepository {
  findAll(params: PaginationParams): Promise<Film[]>;
  findById(id: string): Promise<Film | null>;
  findBySwapiId(swapiId: string): Promise<Film | null>;
  create(film: Film): Promise<Film>;
  update(id: string, data: Partial<Film>): Promise<Film>;
  delete(id: string): Promise<void>;
  upsertBatch(films: Film[]): Promise<void>;
}

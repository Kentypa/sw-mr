import { Starship } from '../../domain/entities/starship.entity';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface';

export interface IStarshipRepository {
  findAll(params: PaginationParams): Promise<Starship[]>;
  findById(id: string): Promise<Starship | null>;
  findBySwapiId(swapiId: string): Promise<Starship | null>;
  create(starship: Starship): Promise<Starship>;
  update(id: string, data: Partial<Starship>): Promise<Starship>;
  delete(id: string): Promise<void>;
  upsertBatch(starships: Starship[]): Promise<void>;
}

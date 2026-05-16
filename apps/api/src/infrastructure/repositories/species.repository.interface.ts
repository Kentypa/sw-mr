import { Species } from '../../domain/entities/species.entity';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface';

export interface ISpeciesRepository {
  findAll(params: PaginationParams): Promise<Species[]>;
  findById(id: string): Promise<Species | null>;
  findBySwapiId(swapiId: string): Promise<Species | null>;
  create(species: Species): Promise<Species>;
  update(id: string, data: Partial<Species>): Promise<Species>;
  delete(id: string): Promise<void>;
  upsertBatch(species: Species[]): Promise<void>;
}

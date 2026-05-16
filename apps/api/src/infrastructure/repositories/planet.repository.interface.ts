import { Planet } from '../../domain/entities/planet.entity';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface';

export interface IPlanetRepository {
  findAll(params: PaginationParams): Promise<Planet[]>;
  findById(id: string): Promise<Planet | null>;
  findBySwapiId(swapiId: string): Promise<Planet | null>;
  create(planet: Planet): Promise<Planet>;
  update(id: string, data: Partial<Planet>): Promise<Planet>;
  delete(id: string): Promise<void>;
  upsertBatch(planets: Planet[]): Promise<void>;
}

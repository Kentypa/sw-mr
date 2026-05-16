import { Character } from '../../domain/entities/character.entity';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface';

export interface ICharacterRepository {
  findAll(params: PaginationParams): Promise<Character[]>;
  findById(id: string): Promise<Character | null>;
  findBySwapiId(swapiId: string): Promise<Character | null>;
  create(character: Character): Promise<Character>;
  update(id: string, data: Partial<Character>): Promise<Character>;
  delete(id: string): Promise<void>;
  upsertBatch(characters: Character[]): Promise<void>;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Character } from '../../domain/entities/character.entity';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface';
import { ICharacterRepository } from '../../infrastructure/repositories/character.repository.interface';
import {
  CreateCharacterDto,
  UpdateCharacterDto,
} from '../../presentation/dtos/character.dto';

@Injectable()
export class CharacterUseCases {
  constructor(private readonly repo: ICharacterRepository) {}

  async getAll(params: PaginationParams): Promise<Character[]> {
    return this.repo.findAll(params);
  }

  async getById(id: string): Promise<Character> {
    const character = await this.repo.findById(id);
    if (!character) throw new NotFoundException('Character not found');
    return character;
  }

  async create(dto: CreateCharacterDto): Promise<Character> {
    const character = new Character(
      crypto.randomUUID(),
      `custom-${Date.now()}`,
      dto.name,
      dto.birthYear,
      dto.eyeColor,
      dto.gender,
      dto.hairColor,
      dto.height,
      dto.mass,
      dto.skinColor,
      null,
      [],
      [],
      [],
    );
    return this.repo.create(character);
  }

  async update(id: string, dto: UpdateCharacterDto): Promise<Character> {
    await this.getById(id);
    return this.repo.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repo.delete(id);
  }
}

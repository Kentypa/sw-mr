import { Injectable, NotFoundException } from '@nestjs/common';
import { Species } from '../../domain/entities/species.entity.js';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface.js';
import { ISpeciesRepository } from '../../infrastructure/repositories/species.repository.interface.js';
import {
  CreateSpeciesDto,
  UpdateSpeciesDto,
} from '../../presentation/dtos/species.dto.js';

@Injectable()
export class SpeciesUseCases {
  constructor(private readonly repo: ISpeciesRepository) {}

  async getAll(params: PaginationParams): Promise<Species[]> {
    return this.repo.findAll(params);
  }

  async getById(id: string): Promise<Species> {
    const species = await this.repo.findById(id);
    if (!species) throw new NotFoundException('Species not found');
    return species;
  }

  async create(dto: CreateSpeciesDto): Promise<Species> {
    const species = new Species(
      crypto.randomUUID(),
      `custom-${Date.now()}`,
      dto.name,
      dto.classification,
      dto.designation,
      dto.averageHeight,
      dto.averageLifespan,
      dto.eyeColors,
      dto.hairColors,
      dto.skinColors,
      dto.language,
      null,
    );
    return this.repo.create(species);
  }

  async update(id: string, dto: UpdateSpeciesDto): Promise<Species> {
    await this.getById(id);
    return this.repo.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repo.delete(id);
  }
}

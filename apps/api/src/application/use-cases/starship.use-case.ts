import { Injectable, NotFoundException } from '@nestjs/common';
import { Starship } from '../../domain/entities/starship.entity.js';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface.js';
import { IStarshipRepository } from '../../infrastructure/repositories/starship.repository.interface.js';
import {
  CreateStarshipDto,
  UpdateStarshipDto,
} from '../../presentation/dtos/starship.dto.js';

@Injectable()
export class StarshipUseCases {
  constructor(private readonly repo: IStarshipRepository) {}

  async getAll(params: PaginationParams): Promise<Starship[]> {
    return this.repo.findAll(params);
  }

  async getById(id: string): Promise<Starship> {
    const starship = await this.repo.findById(id);
    if (!starship) throw new NotFoundException('Starship not found');
    return starship;
  }

  async create(dto: CreateStarshipDto): Promise<Starship> {
    const starship = new Starship(
      crypto.randomUUID(),
      `custom-${Date.now()}`,
      dto.name,
      dto.model,
      dto.starshipClass,
      dto.manufacturer,
      dto.costInCredits,
      dto.length,
      dto.crew,
      dto.passengers,
      dto.maxAtmospheringSpeed,
      dto.hyperdriveRating,
      dto.mglt,
      dto.cargoCapacity,
      dto.consumables,
    );
    return this.repo.create(starship);
  }

  async update(id: string, dto: UpdateStarshipDto): Promise<Starship> {
    await this.getById(id);
    return this.repo.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repo.delete(id);
  }
}

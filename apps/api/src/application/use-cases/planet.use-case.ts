import { Injectable, NotFoundException } from '@nestjs/common';
import { Planet } from '../../domain/entities/planet.entity.js';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface.js';
import { IPlanetRepository } from '../../infrastructure/repositories/planet.repository.interface.js';
import {
  CreatePlanetDto,
  UpdatePlanetDto,
} from '../../presentation/dtos/planet.dto.js';

@Injectable()
export class PlanetUseCases {
  constructor(private readonly repo: IPlanetRepository) {}

  async getAll(params: PaginationParams): Promise<Planet[]> {
    return this.repo.findAll(params);
  }

  async getById(id: string): Promise<Planet> {
    const planet = await this.repo.findById(id);
    if (!planet) throw new NotFoundException('Planet not found');
    return planet;
  }

  async create(dto: CreatePlanetDto): Promise<Planet> {
    const planet = new Planet(
      crypto.randomUUID(),
      `custom-${Date.now()}`,
      dto.name,
      dto.diameter,
      dto.rotationPeriod,
      dto.orbitalPeriod,
      dto.gravity,
      dto.population,
      dto.climate,
      dto.terrain,
      dto.surfaceWater,
    );
    return this.repo.create(planet);
  }

  async update(id: string, dto: UpdatePlanetDto): Promise<Planet> {
    await this.getById(id);
    return this.repo.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repo.delete(id);
  }
}

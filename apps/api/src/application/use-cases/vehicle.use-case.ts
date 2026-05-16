import { Injectable, NotFoundException } from '@nestjs/common';
import { Vehicle } from '../../domain/entities/vehicle.entity.js';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface.js';
import { IVehicleRepository } from '../../infrastructure/repositories/vehicle.repository.interface.js';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from '../../presentation/dtos/vehicle.dto.js';

@Injectable()
export class VehicleUseCases {
  constructor(private readonly repo: IVehicleRepository) {}

  async getAll(params: PaginationParams): Promise<Vehicle[]> {
    return this.repo.findAll(params);
  }

  async getById(id: string): Promise<Vehicle> {
    const vehicle = await this.repo.findById(id);
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async create(dto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = new Vehicle(
      crypto.randomUUID(),
      `custom-${Date.now()}`,
      dto.name,
      dto.model,
      dto.vehicleClass,
      dto.manufacturer,
      dto.length,
      dto.costInCredits,
      dto.crew,
      dto.passengers,
      dto.maxAtmospheringSpeed,
      dto.cargoCapacity,
      dto.consumables,
    );
    return this.repo.create(vehicle);
  }

  async update(id: string, dto: UpdateVehicleDto): Promise<Vehicle> {
    await this.getById(id);
    return this.repo.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repo.delete(id);
  }
}

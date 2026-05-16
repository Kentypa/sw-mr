import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Vehicle } from '../../domain/entities/vehicle.entity.js';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface.js';
import { VehicleOrmEntity } from '../entities/vehicle.orm-entity.js';
import { IVehicleRepository } from './vehicle.repository.interface.js';

@Injectable()
export class VehicleRepository implements IVehicleRepository {
  constructor(
    @InjectRepository(VehicleOrmEntity)
    private readonly repo: Repository<VehicleOrmEntity>,
  ) {}

  async findAll({ limit, page }: PaginationParams): Promise<Vehicle[]> {
    const ormEntities = await this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
    return ormEntities.map((e) => this.toDomain(e));
  }

  async findById(id: string): Promise<Vehicle | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toDomain(orm) : null;
  }

  async findBySwapiId(swapiId: string): Promise<Vehicle | null> {
    const orm = await this.repo.findOneBy({ swapiId });
    return orm ? this.toDomain(orm) : null;
  }

  async create(v: Vehicle): Promise<Vehicle> {
    const entity = this.repo.create({
      id: v.id,
      swapiId: v.swapiId,
      name: v.name,
      model: v.model,
      vehicleClass: v.vehicleClass,
      manufacturer: v.manufacturer,
      length: v.length,
      costInCredits: v.costInCredits,
      crew: v.crew,
      passengers: v.passengers,
      maxAtmospheringSpeed: v.maxAtmospheringSpeed,
      cargoCapacity: v.cargoCapacity,
      consumables: v.consumables,
    });
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async update(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    const payload: Partial<VehicleOrmEntity> = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.model !== undefined) payload.model = data.model;
    if (data.vehicleClass !== undefined)
      payload.vehicleClass = data.vehicleClass;
    if (data.manufacturer !== undefined)
      payload.manufacturer = data.manufacturer;
    if (data.length !== undefined) payload.length = data.length;
    if (data.costInCredits !== undefined)
      payload.costInCredits = data.costInCredits;
    if (data.crew !== undefined) payload.crew = data.crew;
    if (data.passengers !== undefined) payload.passengers = data.passengers;
    if (data.maxAtmospheringSpeed !== undefined)
      payload.maxAtmospheringSpeed = data.maxAtmospheringSpeed;
    if (data.cargoCapacity !== undefined)
      payload.cargoCapacity = data.cargoCapacity;
    if (data.consumables !== undefined) payload.consumables = data.consumables;

    await this.repo.update(id, payload);
    return (await this.findById(id)) as Vehicle;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async upsertBatch(vehicles: Vehicle[]): Promise<void> {
    const swapiIds = vehicles.map((v) => v.swapiId);
    const existing = await this.repo.find({ where: { swapiId: In(swapiIds) } });

    const toSave: VehicleOrmEntity[] = vehicles.map((v) => {
      let entity = existing.find((e) => e.swapiId === v.swapiId);
      if (!entity) entity = this.repo.create();

      entity.swapiId = v.swapiId;
      entity.name = v.name;
      entity.model = v.model;
      entity.vehicleClass = v.vehicleClass;
      entity.manufacturer = v.manufacturer;
      entity.length = v.length;
      entity.costInCredits = v.costInCredits;
      entity.crew = v.crew;
      entity.passengers = v.passengers;
      entity.maxAtmospheringSpeed = v.maxAtmospheringSpeed;
      entity.cargoCapacity = v.cargoCapacity;
      entity.consumables = v.consumables;

      return entity;
    });

    await this.repo.save(toSave);
  }

  private toDomain(orm: VehicleOrmEntity): Vehicle {
    return new Vehicle(
      orm.id,
      orm.swapiId,
      orm.name,
      orm.model,
      orm.vehicleClass,
      orm.manufacturer,
      orm.length,
      orm.costInCredits,
      orm.crew,
      orm.passengers,
      orm.maxAtmospheringSpeed,
      orm.cargoCapacity,
      orm.consumables,
    );
  }
}

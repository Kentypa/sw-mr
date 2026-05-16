import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Starship } from '../../domain/entities/starship.entity.js';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface.js';
import { StarshipOrmEntity } from '../entities/starship.orm-entity.js';
import { IStarshipRepository } from './starship.repository.interface.js';

@Injectable()
export class StarshipRepository implements IStarshipRepository {
  constructor(
    @InjectRepository(StarshipOrmEntity)
    private readonly repo: Repository<StarshipOrmEntity>,
  ) {}

  async findAll({ page, limit }: PaginationParams): Promise<Starship[]> {
    const ormEntities = await this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
    return ormEntities.map((e) => this.toDomain(e));
  }

  async findById(id: string): Promise<Starship | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toDomain(orm) : null;
  }

  async findBySwapiId(swapiId: string): Promise<Starship | null> {
    const orm = await this.repo.findOneBy({ swapiId });
    return orm ? this.toDomain(orm) : null;
  }

  async create(s: Starship): Promise<Starship> {
    const entity = this.repo.create({
      id: s.id,
      swapiId: s.swapiId,
      name: s.name,
      model: s.model,
      starshipClass: s.starshipClass,
      manufacturer: s.manufacturer,
      costInCredits: s.costInCredits,
      length: s.length,
      crew: s.crew,
      passengers: s.passengers,
      maxAtmospheringSpeed: s.maxAtmospheringSpeed,
      hyperdriveRating: s.hyperdriveRating,
      mglt: s.mglt,
      cargoCapacity: s.cargoCapacity,
      consumables: s.consumables,
    });
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async update(id: string, data: Partial<Starship>): Promise<Starship> {
    const payload: Partial<StarshipOrmEntity> = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.model !== undefined) payload.model = data.model;
    if (data.starshipClass !== undefined)
      payload.starshipClass = data.starshipClass;
    if (data.manufacturer !== undefined)
      payload.manufacturer = data.manufacturer;
    if (data.costInCredits !== undefined)
      payload.costInCredits = data.costInCredits;
    if (data.length !== undefined) payload.length = data.length;
    if (data.crew !== undefined) payload.crew = data.crew;
    if (data.passengers !== undefined) payload.passengers = data.passengers;
    if (data.maxAtmospheringSpeed !== undefined)
      payload.maxAtmospheringSpeed = data.maxAtmospheringSpeed;
    if (data.hyperdriveRating !== undefined)
      payload.hyperdriveRating = data.hyperdriveRating;
    if (data.mglt !== undefined) payload.mglt = data.mglt;
    if (data.cargoCapacity !== undefined)
      payload.cargoCapacity = data.cargoCapacity;
    if (data.consumables !== undefined) payload.consumables = data.consumables;

    await this.repo.update(id, payload);
    return (await this.findById(id)) as Starship;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async upsertBatch(starships: Starship[]): Promise<void> {
    const swapiIds = starships.map((s) => s.swapiId);
    const existing = await this.repo.find({ where: { swapiId: In(swapiIds) } });

    const toSave: StarshipOrmEntity[] = starships.map((s) => {
      let entity = existing.find((e) => e.swapiId === s.swapiId);
      if (!entity) entity = this.repo.create();

      entity.swapiId = s.swapiId;
      entity.name = s.name;
      entity.model = s.model;
      entity.starshipClass = s.starshipClass;
      entity.manufacturer = s.manufacturer;
      entity.costInCredits = s.costInCredits;
      entity.length = s.length;
      entity.crew = s.crew;
      entity.passengers = s.passengers;
      entity.maxAtmospheringSpeed = s.maxAtmospheringSpeed;
      entity.hyperdriveRating = s.hyperdriveRating;
      entity.mglt = s.mglt;
      entity.cargoCapacity = s.cargoCapacity;
      entity.consumables = s.consumables;

      return entity;
    });

    await this.repo.save(toSave);
  }

  private toDomain(orm: StarshipOrmEntity): Starship {
    return new Starship(
      orm.id,
      orm.swapiId,
      orm.name,
      orm.model,
      orm.starshipClass,
      orm.manufacturer,
      orm.costInCredits,
      orm.length,
      orm.crew,
      orm.passengers,
      orm.maxAtmospheringSpeed,
      orm.hyperdriveRating,
      orm.mglt,
      orm.cargoCapacity,
      orm.consumables,
    );
  }
}

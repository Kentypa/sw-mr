import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Planet } from '../../domain/entities/planet.entity.js';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface.js';
import { PlanetOrmEntity } from '../entities/planet.orm-entity.js';
import { IPlanetRepository } from './planet.repository.interface.js';

@Injectable()
export class PlanetRepository implements IPlanetRepository {
  constructor(
    @InjectRepository(PlanetOrmEntity)
    private readonly repo: Repository<PlanetOrmEntity>,
  ) {}

  async findAll({ limit, page }: PaginationParams): Promise<Planet[]> {
    const ormEntities = await this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
    return ormEntities.map((e) => this.toDomain(e));
  }

  async findById(id: string): Promise<Planet | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toDomain(orm) : null;
  }

  async findBySwapiId(swapiId: string): Promise<Planet | null> {
    const orm = await this.repo.findOneBy({ swapiId });
    return orm ? this.toDomain(orm) : null;
  }

  async create(p: Planet): Promise<Planet> {
    const entity = this.repo.create({
      id: p.id,
      swapiId: p.swapiId,
      name: p.name,
      diameter: p.diameter,
      rotationPeriod: p.rotationPeriod,
      orbitalPeriod: p.orbitalPeriod,
      gravity: p.gravity,
      population: p.population,
      climate: p.climate,
      terrain: p.terrain,
      surfaceWater: p.surfaceWater,
    });
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async update(id: string, data: Partial<Planet>): Promise<Planet> {
    const payload: Partial<PlanetOrmEntity> = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.diameter !== undefined) payload.diameter = data.diameter;
    if (data.rotationPeriod !== undefined)
      payload.rotationPeriod = data.rotationPeriod;
    if (data.orbitalPeriod !== undefined)
      payload.orbitalPeriod = data.orbitalPeriod;
    if (data.gravity !== undefined) payload.gravity = data.gravity;
    if (data.population !== undefined) payload.population = data.population;
    if (data.climate !== undefined) payload.climate = data.climate;
    if (data.terrain !== undefined) payload.terrain = data.terrain;
    if (data.surfaceWater !== undefined)
      payload.surfaceWater = data.surfaceWater;

    await this.repo.update(id, payload);
    return (await this.findById(id)) as Planet;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async upsertBatch(planets: Planet[]): Promise<void> {
    const swapiIds = planets.map((p) => p.swapiId);
    const existing = await this.repo.find({ where: { swapiId: In(swapiIds) } });

    const toSave: PlanetOrmEntity[] = planets.map((p) => {
      let entity = existing.find((e) => e.swapiId === p.swapiId);
      if (!entity) entity = this.repo.create();

      entity.swapiId = p.swapiId;
      entity.name = p.name;
      entity.diameter = p.diameter;
      entity.rotationPeriod = p.rotationPeriod;
      entity.orbitalPeriod = p.orbitalPeriod;
      entity.gravity = p.gravity;
      entity.population = p.population;
      entity.climate = p.climate;
      entity.terrain = p.terrain;
      entity.surfaceWater = p.surfaceWater;

      return entity;
    });

    await this.repo.save(toSave);
  }

  private toDomain(orm: PlanetOrmEntity): Planet {
    return new Planet(
      orm.id,
      orm.swapiId,
      orm.name,
      orm.diameter,
      orm.rotationPeriod,
      orm.orbitalPeriod,
      orm.gravity,
      orm.population,
      orm.climate,
      orm.terrain,
      orm.surfaceWater,
    );
  }
}

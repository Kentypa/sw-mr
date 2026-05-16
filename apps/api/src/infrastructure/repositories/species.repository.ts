import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, In, Repository } from 'typeorm';
import { Planet } from '../../domain/entities/planet.entity.js';
import { Species } from '../../domain/entities/species.entity.js';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface.js';
import { PlanetOrmEntity } from '../entities/planet.orm-entity.js';
import { SpeciesOrmEntity } from '../entities/species.orm-entity.js';
import { ISpeciesRepository } from './species.repository.interface.js';

@Injectable()
export class SpeciesRepository implements ISpeciesRepository {
  private readonly RELATIONS = ['homeworld'];
  private readonly SELECT: FindOptionsSelect<SpeciesOrmEntity> = {
    id: true,
    swapiId: true,
    name: true,
    classification: true,
    designation: true,
    averageHeight: true,
    averageLifespan: true,
    eyeColors: true,
    hairColors: true,
    skinColors: true,
    language: true,
    homeworld: { id: true, name: true },
  };

  constructor(
    @InjectRepository(SpeciesOrmEntity)
    private readonly repo: Repository<SpeciesOrmEntity>,
  ) {}

  async findAll({ limit, page }: PaginationParams): Promise<Species[]> {
    const ormEntities = await this.repo.find({
      relations: this.RELATIONS,
      select: this.SELECT,
      relationLoadStrategy: 'query',
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
    return ormEntities.map((e) => this.toDomain(e));
  }

  async findById(id: string): Promise<Species | null> {
    const orm = await this.repo.findOne({
      where: { id },
      relations: this.RELATIONS,
      select: this.SELECT,
      relationLoadStrategy: 'query',
    });
    return orm ? this.toDomain(orm) : null;
  }

  async findBySwapiId(swapiId: string): Promise<Species | null> {
    const orm = await this.repo.findOneBy({ swapiId });
    return orm ? this.toDomain(orm) : null;
  }

  async create(s: Species): Promise<Species> {
    const entity = this.repo.create({
      id: s.id,
      swapiId: s.swapiId,
      name: s.name,
      classification: s.classification,
      designation: s.designation,
      averageHeight: s.averageHeight,
      averageLifespan: s.averageLifespan,
      eyeColors: s.eyeColors,
      hairColors: s.hairColors,
      skinColors: s.skinColors,
      language: s.language,
    });
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async update(id: string, data: Partial<Species>): Promise<Species> {
    const payload: Partial<SpeciesOrmEntity> = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.classification !== undefined)
      payload.classification = data.classification;
    if (data.designation !== undefined) payload.designation = data.designation;
    if (data.averageHeight !== undefined)
      payload.averageHeight = data.averageHeight;
    if (data.averageLifespan !== undefined)
      payload.averageLifespan = data.averageLifespan;
    if (data.eyeColors !== undefined) payload.eyeColors = data.eyeColors;
    if (data.hairColors !== undefined) payload.hairColors = data.hairColors;
    if (data.skinColors !== undefined) payload.skinColors = data.skinColors;
    if (data.language !== undefined) payload.language = data.language;

    await this.repo.update(id, payload);
    return (await this.findById(id)) as Species;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async upsertBatch(species: Species[]): Promise<void> {
    const swapiIds = species.map((s) => s.swapiId);
    const existing = await this.repo.find({
      where: { swapiId: In(swapiIds) },
      relations: this.RELATIONS,
      relationLoadStrategy: 'query',
    });

    const toSave: SpeciesOrmEntity[] = species.map((s) => {
      let entity = existing.find((e) => e.swapiId === s.swapiId);
      if (!entity) entity = this.repo.create();

      entity.swapiId = s.swapiId;
      entity.name = s.name;
      entity.classification = s.classification;
      entity.designation = s.designation;
      entity.averageHeight = s.averageHeight;
      entity.averageLifespan = s.averageLifespan;
      entity.eyeColors = s.eyeColors;
      entity.hairColors = s.hairColors;
      entity.skinColors = s.skinColors;
      entity.language = s.language;

      entity.homeworld = s.homeworld
        ? Object.assign(new PlanetOrmEntity(), { id: s.homeworld.id })
        : null;

      return entity;
    });

    await this.repo.save(toSave);
  }

  private toDomain(orm: SpeciesOrmEntity): Species {
    let homeworld: Planet | null = null;

    if (orm.homeworld) {
      homeworld = new Planet(
        orm.homeworld.id,
        '',
        orm.homeworld.name,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      );
    }

    return new Species(
      orm.id,
      orm.swapiId,
      orm.name,
      orm.classification,
      orm.designation,
      orm.averageHeight,
      orm.averageLifespan,
      orm.eyeColors,
      orm.hairColors,
      orm.skinColors,
      orm.language,
      homeworld,
    );
  }
}

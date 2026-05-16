import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Character } from '../../domain/entities/character.entity.js';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface.js';
import { CharacterOrmEntity } from '../entities/character.orm-entity.js';
import { PlanetOrmEntity } from '../entities/planet.orm-entity.js';
import { SpeciesOrmEntity } from '../entities/species.orm-entity.js';
import { StarshipOrmEntity } from '../entities/starship.orm-entity.js';
import { VehicleOrmEntity } from '../entities/vehicle.orm-entity.js';
import { ICharacterRepository } from './character.repository.interface.js';

@Injectable()
export class CharacterRepository implements ICharacterRepository {
  private readonly RELATIONS = [
    'homeworld',
    'species',
    'starships',
    'vehicles',
  ];
  private readonly SELECT = {
    id: true,
    swapiId: true,
    name: true,
    birthYear: true,
    eyeColor: true,
    gender: true,
    hairColor: true,
    height: true,
    mass: true,
    skinColor: true,
    homeworld: { id: true, name: true },
    species: { id: true, name: true },
    starships: { id: true, name: true },
    vehicles: { id: true, name: true },
  };

  constructor(
    @InjectRepository(CharacterOrmEntity)
    private readonly repo: Repository<CharacterOrmEntity>,
  ) {}

  async findAll({ limit, page }: PaginationParams): Promise<Character[]> {
    const ormEntities = await this.repo.find({
      relations: this.RELATIONS,
      select: this.SELECT as any,
      relationLoadStrategy: 'query',
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
    return ormEntities.map((e) => this.toDomain(e));
  }

  async findById(id: string): Promise<Character | null> {
    const orm = await this.repo.findOne({
      where: { id },
      relations: this.RELATIONS,
      select: this.SELECT as any,
      relationLoadStrategy: 'query',
    });
    return orm ? this.toDomain(orm) : null;
  }

  async findBySwapiId(swapiId: string): Promise<Character | null> {
    const orm = await this.repo.findOneBy({ swapiId });
    return orm ? this.toDomain(orm) : null;
  }

  async create(c: Character): Promise<Character> {
    const entity = this.repo.create({
      id: c.id,
      swapiId: c.swapiId,
      name: c.name,
      birthYear: c.birthYear,
      eyeColor: c.eyeColor,
      gender: c.gender,
      hairColor: c.hairColor,
      height: c.height,
      mass: c.mass,
      skinColor: c.skinColor,
    });
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async update(id: string, data: Partial<Character>): Promise<Character> {
    const payload: Partial<CharacterOrmEntity> = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.birthYear !== undefined) payload.birthYear = data.birthYear;
    if (data.eyeColor !== undefined) payload.eyeColor = data.eyeColor;
    if (data.gender !== undefined) payload.gender = data.gender;
    if (data.hairColor !== undefined) payload.hairColor = data.hairColor;
    if (data.height !== undefined) payload.height = data.height;
    if (data.mass !== undefined) payload.mass = data.mass;
    if (data.skinColor !== undefined) payload.skinColor = data.skinColor;

    await this.repo.update(id, payload);
    return (await this.findById(id)) as Character;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async upsertBatch(characters: Character[]): Promise<void> {
    const swapiIds = characters.map((c) => c.swapiId);
    const existing = await this.repo.find({
      where: { swapiId: In(swapiIds) },
      relations: ['species', 'starships', 'vehicles'],
      relationLoadStrategy: 'query',
    });

    const toSave: CharacterOrmEntity[] = characters.map((c) => {
      let entity = existing.find((e) => e.swapiId === c.swapiId);
      if (!entity) entity = this.repo.create();

      entity.swapiId = c.swapiId;
      entity.name = c.name;
      entity.birthYear = c.birthYear;
      entity.eyeColor = c.eyeColor;
      entity.gender = c.gender;
      entity.hairColor = c.hairColor;
      entity.height = c.height;
      entity.mass = c.mass;
      entity.skinColor = c.skinColor;

      entity.homeworld = c.homeworld
        ? Object.assign(new PlanetOrmEntity(), { id: c.homeworld.id })
        : null;
      entity.species = c.species.map((s) =>
        Object.assign(new SpeciesOrmEntity(), { id: s.id }),
      );
      entity.starships = c.starships.map((s) =>
        Object.assign(new StarshipOrmEntity(), { id: s.id }),
      );
      entity.vehicles = c.vehicles.map((v) =>
        Object.assign(new VehicleOrmEntity(), { id: v.id }),
      );

      return entity;
    });

    await this.repo.save(toSave);
  }

  private toDomain(orm: CharacterOrmEntity): Character {
    return new Character(
      orm.id,
      orm.swapiId,
      orm.name,
      orm.birthYear,
      orm.eyeColor,
      orm.gender,
      orm.hairColor,
      orm.height,
      orm.mass,
      orm.skinColor,
      (orm.homeworld as any) || null,
      (orm.species as any) || [],
      (orm.starships as any) || [],
      (orm.vehicles as any) || [],
    );
  }
}

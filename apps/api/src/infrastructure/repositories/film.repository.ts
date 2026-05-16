import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Character } from '../../domain/entities/character.entity.js';
import { Film } from '../../domain/entities/film.entity.js';
import { Planet } from '../../domain/entities/planet.entity.js';
import { Species } from '../../domain/entities/species.entity.js';
import { Starship } from '../../domain/entities/starship.entity.js';
import { Vehicle } from '../../domain/entities/vehicle.entity.js';
import { PaginationParams } from '../../domain/interfaces/pagination-params.interface.js';
import { CharacterOrmEntity } from '../entities/character.orm-entity.js';
import { FilmOrmEntity } from '../entities/film.orm-entity.js';
import { PlanetOrmEntity } from '../entities/planet.orm-entity.js';
import { SpeciesOrmEntity } from '../entities/species.orm-entity.js';
import { StarshipOrmEntity } from '../entities/starship.orm-entity.js';
import { VehicleOrmEntity } from '../entities/vehicle.orm-entity.js';
import { IFilmRepository } from './film.repository.interface.js';

@Injectable()
export class FilmRepository implements IFilmRepository {
  private readonly RELATIONS = [
    'characters',
    'planets',
    'starships',
    'vehicles',
    'species',
  ];

  constructor(
    @InjectRepository(FilmOrmEntity)
    private readonly repo: Repository<FilmOrmEntity>,
  ) {}

  async findAll({ limit, page }: PaginationParams): Promise<Film[]> {
    const ormEntities = await this.repo.find({
      relations: this.RELATIONS,
      relationLoadStrategy: 'query',
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
    return ormEntities.map((e) => this.toDomain(e));
  }

  async findById(id: string): Promise<Film | null> {
    const orm = await this.repo.findOne({
      where: { id },
      relations: this.RELATIONS,
      relationLoadStrategy: 'query',
    });
    return orm ? this.toDomain(orm) : null;
  }

  async findBySwapiId(swapiId: string): Promise<Film | null> {
    const orm = await this.repo.findOneBy({ swapiId });
    return orm ? this.toDomain(orm) : null;
  }

  async create(film: Film): Promise<Film> {
    const entity = this.repo.create({
      id: film.id,
      swapiId: film.swapiId,
      title: film.title,
      episodeId: film.episodeId,
      openingCrawl: film.openingCrawl,
      director: film.director,
      producer: film.producer,
      releaseDate: film.releaseDate,
    });
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async update(id: string, data: Partial<Film>): Promise<Film> {
    const payload: Partial<FilmOrmEntity> = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.episodeId !== undefined) payload.episodeId = data.episodeId;
    if (data.openingCrawl !== undefined)
      payload.openingCrawl = data.openingCrawl;
    if (data.director !== undefined) payload.director = data.director;
    if (data.producer !== undefined) payload.producer = data.producer;
    if (data.releaseDate !== undefined) payload.releaseDate = data.releaseDate;

    await this.repo.update(id, payload);
    return (await this.findById(id)) as Film;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async upsertBatch(films: Film[]): Promise<void> {
    const swapiIds = films.map((f) => f.swapiId);
    const existing = await this.repo.find({
      where: { swapiId: In(swapiIds) },
      relations: this.RELATIONS,
      relationLoadStrategy: 'query',
    });

    const toSave: FilmOrmEntity[] = films.map((f) => {
      let entity = existing.find((e) => e.swapiId === f.swapiId);
      if (!entity) entity = this.repo.create();

      entity.swapiId = f.swapiId;
      entity.title = f.title;
      entity.episodeId = f.episodeId;
      entity.openingCrawl = f.openingCrawl;
      entity.director = f.director;
      entity.producer = f.producer;
      entity.releaseDate = f.releaseDate;

      entity.characters = f.characters.map((c) =>
        Object.assign(new CharacterOrmEntity(), { id: c.id }),
      );
      entity.planets = f.planets.map((p) =>
        Object.assign(new PlanetOrmEntity(), { id: p.id }),
      );
      entity.starships = f.starships.map((s) =>
        Object.assign(new StarshipOrmEntity(), { id: s.id }),
      );
      entity.vehicles = f.vehicles.map((v) =>
        Object.assign(new VehicleOrmEntity(), { id: v.id }),
      );
      entity.species = f.species.map((s) =>
        Object.assign(new SpeciesOrmEntity(), { id: s.id }),
      );

      return entity;
    });

    await this.repo.save(toSave);
  }

  private toDomain(orm: FilmOrmEntity): Film {
    return new Film(
      orm.id,
      orm.swapiId,
      orm.title,
      orm.episodeId,
      orm.openingCrawl,
      orm.director,
      orm.producer,
      orm.releaseDate,
      (orm.characters || []).map(
        (c) =>
          new Character(
            c.id,
            c.swapiId,
            c.name,
            c.birthYear,
            c.eyeColor,
            c.gender,
            c.hairColor,
            c.height,
            c.mass,
            c.skinColor,
            null,
            [],
            [],
            [],
          ),
      ),
      (orm.planets || []).map(
        (p) =>
          new Planet(
            p.id,
            p.swapiId,
            p.name,
            p.diameter,
            p.rotationPeriod,
            p.orbitalPeriod,
            p.gravity,
            p.population,
            p.climate,
            p.terrain,
            p.surfaceWater,
          ),
      ),
      (orm.starships || []).map(
        (s) =>
          new Starship(
            s.id,
            s.swapiId,
            s.name,
            s.model,
            s.starshipClass,
            s.manufacturer,
            s.costInCredits,
            s.length,
            s.crew,
            s.passengers,
            s.maxAtmospheringSpeed,
            s.hyperdriveRating,
            s.mglt,
            s.cargoCapacity,
            s.consumables,
          ),
      ),
      (orm.vehicles || []).map(
        (v) =>
          new Vehicle(
            v.id,
            v.swapiId,
            v.name,
            v.model,
            v.vehicleClass,
            v.manufacturer,
            v.length,
            v.costInCredits,
            v.crew,
            v.passengers,
            v.maxAtmospheringSpeed,
            v.cargoCapacity,
            v.consumables,
          ),
      ),
      (orm.species || []).map(
        (s) =>
          new Species(
            s.id,
            s.swapiId,
            s.name,
            s.classification,
            s.designation,
            s.averageHeight,
            s.averageLifespan,
            s.eyeColors,
            s.hairColors,
            s.skinColors,
            s.language,
            null,
          ),
      ),
    );
  }
}

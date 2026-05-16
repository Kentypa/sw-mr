import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../../domain/entities/image.entity.js';
import { ImageOrmEntity } from '../entities/image.orm-entity.js';
import { IImageRepository } from './image.repository.interface.js';

@Injectable()
export class ImageRepository implements IImageRepository {
  constructor(
    @InjectRepository(ImageOrmEntity)
    private readonly repo: Repository<ImageOrmEntity>,
  ) {}

  async findByEntity(entityType: string, entityId: string): Promise<Image[]> {
    const ormEntities = await this.repo.find({
      where: { entityType, entityId },
    });
    return ormEntities.map(this.toDomain);
  }

  async findById(id: string): Promise<Image | null> {
    const orm = await this.repo.findOneBy({ id });
    return orm ? this.toDomain(orm) : null;
  }

  async create(img: Image): Promise<Image> {
    const entity = this.repo.create(img);
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  private toDomain(orm: ImageOrmEntity): Image {
    return new Image(
      orm.id,
      orm.entityType,
      orm.entityId,
      orm.filename,
      orm.symlink,
    );
  }
}

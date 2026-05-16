import { Image } from '../../domain/entities/image.entity';

export interface IImageRepository {
  findByEntity(entityType: string, entityId: string): Promise<Image[]>;
  findById(id: string): Promise<Image | null>;
  create(image: Image): Promise<Image>;
  delete(id: string): Promise<void>;
}

import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs/promises';
import 'multer';
import * as path from 'path';
import { Image } from '../../domain/entities/image.entity';
import { IImageRepository } from '../../infrastructure/repositories/image.repository.interface';

@Injectable()
export class ImageUseCases implements OnModuleInit {
  private readonly UPLOAD_DIR = path.join(process.cwd(), 'storage', 'uploads');
  private readonly LINKS_DIR = path.join(process.cwd(), 'storage', 'links');

  constructor(private readonly repo: IImageRepository) {}

  async onModuleInit() {
    await fs.mkdir(this.UPLOAD_DIR, { recursive: true });
    await fs.mkdir(this.LINKS_DIR, { recursive: true });
  }

  async uploadForEntity(
    entityType: string,
    entityId: string,
    files: Express.Multer.File[],
  ): Promise<Image[]> {
    const images: Image[] = [];

    for (const file of files) {
      const symlinkName = `${crypto.randomUUID()}${path.extname(file.filename)}`;
      const targetPath = path.join(this.UPLOAD_DIR, file.filename);
      const linkPath = path.join(this.LINKS_DIR, symlinkName);

      await fs.symlink(targetPath, linkPath);

      const image = new Image(
        crypto.randomUUID(),
        entityType,
        entityId,
        file.filename,
        symlinkName,
      );
      const saved = await this.repo.create(image);
      images.push(saved);
    }
    return images;
  }

  async getByEntity(entityType: string, entityId: string): Promise<Image[]> {
    return this.repo.findByEntity(entityType, entityId);
  }

  async delete(id: string): Promise<void> {
    const image = await this.repo.findById(id);
    if (!image) throw new NotFoundException('Image not found');

    await fs.unlink(path.join(this.LINKS_DIR, image.symlink)).catch(() => null);
    await fs
      .unlink(path.join(this.UPLOAD_DIR, image.filename))
      .catch(() => null);

    await this.repo.delete(id);
  }

  getSymlinkPath(symlink: string): string {
    return path.join(this.LINKS_DIR, symlink);
  }
}

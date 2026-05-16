import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUseCases } from '../../application/use-cases/image.use-case.js';
import { ImageController } from '../../presentation/controllers/image.controller.js';
import { ImageOrmEntity } from '../entities/image.orm-entity.js';
import { ImageRepository } from '../repositories/image.repository.js';

@Module({
  imports: [TypeOrmModule.forFeature([ImageOrmEntity])],
  controllers: [ImageController],
  providers: [
    { provide: 'IImageRepository', useClass: ImageRepository },
    {
      provide: ImageUseCases,
      inject: ['IImageRepository'],
      useFactory: (repo) => new ImageUseCases(repo),
    },
  ],
})
export class ImageModule {}

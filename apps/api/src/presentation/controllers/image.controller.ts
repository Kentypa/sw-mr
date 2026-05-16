import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as crypto from 'crypto';
import { Response } from 'express';
import * as fs from 'fs/promises';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ImageUseCases } from '../../application/use-cases/image.use-case.js';
import { ImageResponseDto } from '../dtos/image.dto.js';

@ApiTags('Images')
@Controller('images')
export class ImageController {
  constructor(private readonly useCases: ImageUseCases) {}

  @Post(':entityType/:entityId')
  @ApiOperation({ summary: 'Upload images for entity' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './storage/uploads',
        filename: (req, file, cb) => {
          cb(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async upload(
    @Param('entityType') entityType: string,
    @Param('entityId', ParseUUIDPipe) entityId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ImageResponseDto[]> {
    if (!files?.length) throw new BadRequestException('No files uploaded');
    const images = await this.useCases.uploadForEntity(
      entityType,
      entityId,
      files,
    );
    return images.map((i) => new ImageResponseDto(i));
  }

  @Get('entity/:entityType/:entityId')
  @ApiOperation({ summary: 'Get images by entity' })
  async getByEntity(
    @Param('entityType') entityType: string,
    @Param('entityId', ParseUUIDPipe) entityId: string,
  ): Promise<ImageResponseDto[]> {
    const images = await this.useCases.getByEntity(entityType, entityId);
    return images.map((i) => new ImageResponseDto(i));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete image' })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.useCases.delete(id);
  }

  @Get('link/:symlink')
  @ApiOperation({ summary: 'View image via symlink' })
  async viewImage(@Param('symlink') symlink: string, @Res() res: Response) {
    const linkPath = this.useCases.getSymlinkPath(symlink);
    try {
      await fs.access(linkPath);
      res.sendFile(linkPath);
    } catch {
      res.status(404).send({ statusCode: 404, message: 'Image not found' });
    }
  }
}

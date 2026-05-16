import { ApiProperty } from '@nestjs/swagger';
import { Image } from '../../domain/entities/image.entity';

export class ImageResponseDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() entityType!: string;
  @ApiProperty({ format: 'uuid' }) entityId!: string;
  @ApiProperty() url!: string;

  constructor(image: Image) {
    this.id = image.id;
    this.entityType = image.entityType;
    this.entityId = image.entityId;
    this.url = `/images/link/${image.symlink}`;
  }
}

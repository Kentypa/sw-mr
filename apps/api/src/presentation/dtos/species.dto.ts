import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Species } from '../../domain/entities/species.entity';

class RelationDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() name!: string;
}

export class CreateSpeciesDto {
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiProperty() @IsString() @IsNotEmpty() classification!: string;
  @ApiProperty() @IsString() @IsNotEmpty() designation!: string;
  @ApiProperty() @IsString() @IsNotEmpty() averageHeight!: string;
  @ApiProperty() @IsString() @IsNotEmpty() averageLifespan!: string;
  @ApiProperty() @IsString() @IsNotEmpty() eyeColors!: string;
  @ApiProperty() @IsString() @IsNotEmpty() hairColors!: string;
  @ApiProperty() @IsString() @IsNotEmpty() skinColors!: string;
  @ApiProperty() @IsString() @IsNotEmpty() language!: string;
}

export class UpdateSpeciesDto extends PartialType(CreateSpeciesDto) {}

export class SpeciesResponseDto extends CreateSpeciesDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() swapiId!: string;

  @ApiProperty({ type: RelationDto, nullable: true })
  homeworld!: RelationDto | null;

  constructor(s: Species) {
    super();
    this.id = s.id;
    this.swapiId = s.swapiId;
    this.name = s.name;
    this.classification = s.classification;
    this.designation = s.designation;
    this.averageHeight = s.averageHeight;
    this.averageLifespan = s.averageLifespan;
    this.eyeColors = s.eyeColors;
    this.hairColors = s.hairColors;
    this.skinColors = s.skinColors;
    this.language = s.language;

    this.homeworld = s.homeworld
      ? { id: s.homeworld.id, name: s.homeworld.name }
      : null;
  }
}

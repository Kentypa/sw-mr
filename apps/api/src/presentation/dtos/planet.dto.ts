import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Planet } from '../../domain/entities/planet.entity';

export class CreatePlanetDto {
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiProperty() @IsString() @IsNotEmpty() diameter!: string;
  @ApiProperty() @IsString() @IsNotEmpty() rotationPeriod!: string;
  @ApiProperty() @IsString() @IsNotEmpty() orbitalPeriod!: string;
  @ApiProperty() @IsString() @IsNotEmpty() gravity!: string;
  @ApiProperty() @IsString() @IsNotEmpty() population!: string;
  @ApiProperty() @IsString() @IsNotEmpty() climate!: string;
  @ApiProperty() @IsString() @IsNotEmpty() terrain!: string;
  @ApiProperty() @IsString() @IsNotEmpty() surfaceWater!: string;
}

export class UpdatePlanetDto extends PartialType(CreatePlanetDto) {}

export class PlanetResponseDto extends CreatePlanetDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() swapiId!: string;

  constructor(p: Planet) {
    super();
    this.id = p.id;
    this.swapiId = p.swapiId;
    this.name = p.name;
    this.diameter = p.diameter;
    this.rotationPeriod = p.rotationPeriod;
    this.orbitalPeriod = p.orbitalPeriod;
    this.gravity = p.gravity;
    this.population = p.population;
    this.climate = p.climate;
    this.terrain = p.terrain;
    this.surfaceWater = p.surfaceWater;
  }
}

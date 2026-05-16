import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Starship } from '../../domain/entities/starship.entity';

export class CreateStarshipDto {
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiProperty() @IsString() @IsNotEmpty() model!: string;
  @ApiProperty() @IsString() @IsNotEmpty() starshipClass!: string;
  @ApiProperty() @IsString() @IsNotEmpty() manufacturer!: string;
  @ApiProperty() @IsString() @IsNotEmpty() costInCredits!: string;
  @ApiProperty() @IsString() @IsNotEmpty() length!: string;
  @ApiProperty() @IsString() @IsNotEmpty() crew!: string;
  @ApiProperty() @IsString() @IsNotEmpty() passengers!: string;
  @ApiProperty() @IsString() @IsNotEmpty() maxAtmospheringSpeed!: string;
  @ApiProperty() @IsString() @IsNotEmpty() hyperdriveRating!: string;
  @ApiProperty() @IsString() @IsNotEmpty() mglt!: string;
  @ApiProperty() @IsString() @IsNotEmpty() cargoCapacity!: string;
  @ApiProperty() @IsString() @IsNotEmpty() consumables!: string;
}

export class UpdateStarshipDto extends PartialType(CreateStarshipDto) {}

export class StarshipResponseDto extends CreateStarshipDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() swapiId!: string;

  constructor(s: Starship) {
    super();
    this.id = s.id;
    this.swapiId = s.swapiId;
    this.name = s.name;
    this.model = s.model;
    this.starshipClass = s.starshipClass;
    this.manufacturer = s.manufacturer;
    this.costInCredits = s.costInCredits;
    this.length = s.length;
    this.crew = s.crew;
    this.passengers = s.passengers;
    this.maxAtmospheringSpeed = s.maxAtmospheringSpeed;
    this.hyperdriveRating = s.hyperdriveRating;
    this.mglt = s.mglt;
    this.cargoCapacity = s.cargoCapacity;
    this.consumables = s.consumables;
  }
}

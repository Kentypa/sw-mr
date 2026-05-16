import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Character } from '../../domain/entities/character.entity';

class RelationDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() name!: string;
}

export class CreateCharacterDto {
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiProperty() @IsString() @IsNotEmpty() birthYear!: string;
  @ApiProperty() @IsString() @IsNotEmpty() eyeColor!: string;
  @ApiProperty() @IsString() @IsNotEmpty() gender!: string;
  @ApiProperty() @IsString() @IsNotEmpty() hairColor!: string;
  @ApiProperty() @IsString() @IsNotEmpty() height!: string;
  @ApiProperty() @IsString() @IsNotEmpty() mass!: string;
  @ApiProperty() @IsString() @IsNotEmpty() skinColor!: string;
}

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}

export class CharacterResponseDto extends CreateCharacterDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() swapiId!: string;

  @ApiProperty({ type: RelationDto, nullable: true })
  homeworld!: RelationDto | null;
  @ApiProperty({ type: [RelationDto] }) species!: RelationDto[];
  @ApiProperty({ type: [RelationDto] }) starships!: RelationDto[];
  @ApiProperty({ type: [RelationDto] }) vehicles!: RelationDto[];

  constructor(c: Character) {
    super();
    this.id = c.id;
    this.swapiId = c.swapiId;
    this.name = c.name;
    this.birthYear = c.birthYear;
    this.eyeColor = c.eyeColor;
    this.gender = c.gender;
    this.hairColor = c.hairColor;
    this.height = c.height;
    this.mass = c.mass;
    this.skinColor = c.skinColor;

    this.homeworld = c.homeworld
      ? { id: c.homeworld.id, name: c.homeworld.name }
      : null;
    this.species = c.species?.map((s) => ({ id: s.id, name: s.name })) || [];
    this.starships =
      c.starships?.map((s) => ({ id: s.id, name: s.name })) || [];
    this.vehicles = c.vehicles?.map((v) => ({ id: v.id, name: v.name })) || [];
  }
}

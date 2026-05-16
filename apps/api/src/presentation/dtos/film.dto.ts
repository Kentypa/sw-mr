import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Film } from '../../domain/entities/film.entity';

class RelationItemDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() name!: string;
}

export class CreateFilmDto {
  @ApiProperty() @IsString() @IsNotEmpty() title!: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() episodeId!: number;
  @ApiProperty() @IsString() @IsNotEmpty() openingCrawl!: string;
  @ApiProperty() @IsString() @IsNotEmpty() director!: string;
  @ApiProperty() @IsString() @IsNotEmpty() producer!: string;
  @ApiProperty() @IsString() @IsNotEmpty() releaseDate!: string;
}

export class UpdateFilmDto extends PartialType(CreateFilmDto) {}

export class FilmResponseDto extends CreateFilmDto {
  @ApiProperty({ format: 'uuid' }) id!: string;
  @ApiProperty() swapiId!: string;

  @ApiProperty({ type: [RelationItemDto] }) characters!: RelationItemDto[];
  @ApiProperty({ type: [RelationItemDto] }) planets!: RelationItemDto[];
  @ApiProperty({ type: [RelationItemDto] }) starships!: RelationItemDto[];
  @ApiProperty({ type: [RelationItemDto] }) vehicles!: RelationItemDto[];
  @ApiProperty({ type: [RelationItemDto] }) species!: RelationItemDto[];

  constructor(film: Film) {
    super();
    this.id = film.id;
    this.swapiId = film.swapiId;
    this.title = film.title;
    this.episodeId = film.episodeId;
    this.openingCrawl = film.openingCrawl;
    this.director = film.director;
    this.producer = film.producer;
    this.releaseDate = film.releaseDate;

    this.characters =
      film.characters?.map((c) => ({ id: c.id, name: c.name })) || [];
    this.planets = film.planets?.map((p) => ({ id: p.id, name: p.name })) || [];
    this.starships =
      film.starships?.map((s) => ({ id: s.id, name: s.name })) || [];
    this.vehicles =
      film.vehicles?.map((v) => ({ id: v.id, name: v.name })) || [];
    this.species = film.species?.map((s) => ({ id: s.id, name: s.name })) || [];
  }
}

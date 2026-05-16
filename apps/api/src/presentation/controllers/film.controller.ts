import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilmUseCases } from '../../application/use-cases/film.use-case.js';
import {
  CreateFilmDto,
  FilmResponseDto,
  UpdateFilmDto,
} from '../dtos/film.dto.js';
import { PaginationDto } from '../dtos/pagination.dto.js';

@ApiTags('Films')
@Controller('films')
export class FilmController {
  constructor(private readonly useCases: FilmUseCases) {}

  @Post()
  @ApiOperation({ summary: 'Create film' })
  @ApiResponse({ status: 201, type: FilmResponseDto })
  async create(@Body() dto: CreateFilmDto): Promise<FilmResponseDto> {
    const film = await this.useCases.create(dto);
    return new FilmResponseDto(film);
  }

  @Get()
  @ApiOperation({ summary: 'Get all films' })
  @ApiResponse({ status: 200, type: [FilmResponseDto] })
  async findAll(@Query() query: PaginationDto): Promise<FilmResponseDto[]> {
    const films = await this.useCases.getAll(query);
    return films.map((f) => new FilmResponseDto(f));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get film by ID' })
  @ApiResponse({ status: 200, type: FilmResponseDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FilmResponseDto> {
    const film = await this.useCases.getById(id);
    return new FilmResponseDto(film);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update film' })
  @ApiResponse({ status: 200, type: FilmResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateFilmDto,
  ): Promise<FilmResponseDto> {
    const film = await this.useCases.update(id, dto);
    return new FilmResponseDto(film);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete film' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.useCases.delete(id);
  }
}

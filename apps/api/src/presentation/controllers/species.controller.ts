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
import { SpeciesUseCases } from '../../application/use-cases/species.use-case.js';
import { PaginationDto } from '../dtos/pagination.dto.js';
import {
  CreateSpeciesDto,
  SpeciesResponseDto,
  UpdateSpeciesDto,
} from '../dtos/species.dto.js';

@ApiTags('Species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly useCases: SpeciesUseCases) {}

  @Post()
  @ApiOperation({ summary: 'Create species' })
  @ApiResponse({ status: 201, type: SpeciesResponseDto })
  async create(@Body() dto: CreateSpeciesDto): Promise<SpeciesResponseDto> {
    const species = await this.useCases.create(dto);
    return new SpeciesResponseDto(species);
  }

  @Get()
  @ApiOperation({ summary: 'Get all species' })
  @ApiResponse({ status: 200, type: [SpeciesResponseDto] })
  async findAll(@Query() query: PaginationDto): Promise<SpeciesResponseDto[]> {
    const speciesList = await this.useCases.getAll(query);
    return speciesList.map((s) => new SpeciesResponseDto(s));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get species by ID' })
  @ApiResponse({ status: 200, type: SpeciesResponseDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<SpeciesResponseDto> {
    const species = await this.useCases.getById(id);
    return new SpeciesResponseDto(species);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update species' })
  @ApiResponse({ status: 200, type: SpeciesResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSpeciesDto,
  ): Promise<SpeciesResponseDto> {
    const species = await this.useCases.update(id, dto);
    return new SpeciesResponseDto(species);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete species' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.useCases.delete(id);
  }
}
